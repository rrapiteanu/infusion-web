import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";

import { ApolloProvider as ApolloProviderHooks } from "@apollo/react-hooks";
import { ApolloProvider } from "react-apollo";
import withApollo from "../lib/withApollo";

import { ThemeProvider, StylesProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import UserContext from "../lib/UserContext";
import nextCookie from "next-cookies";
import { refreshSocket } from "../lib/initApollo";
import withApolloClient from "../lib/withApolloClient";
import theme from "../lib/theme";

class MyApp extends App<any, any> {
  static async getInitialProps({ Component, router, ctx }) {
    const { token } = nextCookie(ctx);

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, token };
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    const { apolloClient, token, socket } = this.props;

    if (!token) {
      apolloClient.clearStore();
    }
    if (socket) {
      refreshSocket(socket);
    }
  }

  render() {
    const { Component, pageProps, apolloClient, token, socket } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ApolloProviderHooks client={apolloClient}>
            <Head>
              <title>My page</title>
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
              />
              <link rel="manifest" href="/static/manifest.json" />
            </Head>

            <ThemeProvider theme={theme}>
              <StylesProvider injectFirst disableGeneration={false}>
                <CssBaseline />
                <UserContext.Provider
                  value={{
                    isAuth: token
                  }}
                >
                  <Component {...pageProps} />
                </UserContext.Provider>
              </StylesProvider>
            </ThemeProvider>
          </ApolloProviderHooks>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
