import React from "react";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";
import initApollo from "./initApollo";
import Head from "next/head";
import { getDataFromTree } from "@apollo/react-ssr";

import { isBrowser } from "./isBrowser";
import cookie from "cookie";

function parseCookies(req, options = {}) {
  return cookie.parse(
    req ? req.headers.cookie || "" : document.cookie,
    options
  );
}

export default App => {
  return class Apollo extends React.Component {
    static displayName = "withApollo(App)";
    static async getInitialProps(ctx) {
      const {
        AppTree,
        ctx: { req, res }
      } = ctx;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data

      const { client } = initApollo(
        {},
        {
          getToken: () => parseCookies(req).token
        }
      );

      const apollo = client;
      if (typeof window === "undefined") {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <AppTree {...appProps} apolloClient={apollo} />
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error("Error while running `getDataFromTree`", error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState
      };
    }

    apolloClient: ApolloClient<NormalizedCacheObject>;
    absintheSocket: any;

    constructor(props) {
      super(props);
      const { client, socket } = initApollo(props.apolloState, {
        getToken: () => {
          //@ts-ignore
          return parseCookies().token;
        }
      });

      this.apolloClient = client;
      this.absintheSocket = socket;
    }

    render() {
      return (
        <App
          apolloClient={this.apolloClient}
          socket={this.absintheSocket}
          {...this.props}
        />
      );
    }
  };
};
