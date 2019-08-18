import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject
} from "apollo-boost";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import { isBrowser } from "./isBrowser";

import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";
import { hasSubscription } from "@jumpn/utils-graphql";
import { split } from "apollo-link";
import Cookies from "js-cookie";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;
let absintheSocket = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as any).fetch = fetch;
}

interface Options {
  getToken: () => string;
}

function create(initialState: any, { getToken }: Options) {
  let httpLink = createHttpLink({
    uri: process.env.API_URL,
    credentials: "include"
  });

  let socket;

  if (isBrowser) {
    socket = AbsintheSocket.create(
      new PhoenixSocket(process.env.WS_URL, {
        params: () => {
          if (Cookies.get("token")) {
            return { token: Cookies.get("token") };
          } else {
            return {};
          }
        }
      })
    );
    const socketLink = createAbsintheSocketLink(socket);

    httpLink = split(
      operation => hasSubscription(operation.query),
      socketLink,
      httpLink
    );
  }

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const client = new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {})
  });

  return { client, socket };
}

export default function initApollo(initialState: any, options: Options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    const { client, socket } = create(initialState, options);
    apolloClient = client;
    absintheSocket = socket;
  }

  return { client: apolloClient, socket: absintheSocket };
}

export const refreshSocket = socket => {
  // Close the connection to force a reconnection with the
  // new token parameter.
  socket.phoenixSocket.conn && socket.phoenixSocket.conn.close();
};
