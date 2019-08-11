import * as React from "react";
import { MeComponent } from "../generated/apolloComponents";
import { meQuery } from "../graphql/user/query/me";

import redirect from "./redirect";
import { ApolloClient, NormalizedCacheObject } from "apollo-boost";

export const securePage = C => {
  return class ProtectedPage extends React.Component {
    static async getInitialProps(ctx: any) {
      const currentUser = await getCurrentUser(ctx.apolloClient);

      if (!currentUser) {
        redirect(ctx, "/login");
      }

      const componentProps =
        C.getInitialProps && (await C.getInitialProps(ctx));

      return {
        ...componentProps
      };
    }

    render() {
      const CH = withAuth(C);

      return <CH {...this.props} />;
    }
  };
};

export const withAuth = <T extends object>(C: React.ComponentClass<T>) => {
  return class AuthComponent extends React.Component<T> {
    render() {
      return (
        <MeComponent>
          {({ data }) => {
            let isAuth = false;
            let currentUser = null;

            if (data) {
              isAuth = data.me ? true : false;
              currentUser = data.me ? data.me : null;
            }

            return (
              <C {...this.props} isAuth={isAuth} currentUser={currentUser} />
            );
          }}
        </MeComponent>
      );
    }
  };
};

export const getCurrentUser = (
  apolloClient: ApolloClient<NormalizedCacheObject>
) => {
  return new Promise(async (resolve, _reject) => {
    try {
      const response = await apolloClient.query({ query: meQuery });
      if (!response || !response.data || !response.data.me) {
        resolve(null);
      } else resolve(response.data.me);
    } catch (error) {
      resolve(null);
    }
  });
};
