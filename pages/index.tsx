import * as React from "react";

import Layout from "../components/ui/Layout/Layout";

import HomepageHeader from "../components/ui/HomepageHeader/HomepageHeader";
import HomepageContent from "../components/ui/HomepageContent/HomepageContent";

import { MyContext } from "../interfaces/MyContext";
import { setAuth } from "../lib/auth";
import nextCookie from "next-cookies";

import redirect from "../lib/redirect";

class IndexPage extends React.Component<any, any> {
  static async getInitialProps({ apolloClient, ...ctx }: MyContext) {
    const { token } = nextCookie(ctx);

    if (token) {
      redirect(ctx, "/feed");
    }
    return {
      isAuth: false
    };
  }

  render() {
    return (
      <Layout menuType="relative">
        <HomepageHeader />
        <HomepageContent />
      </Layout>
    );
  }
}

export default IndexPage;
