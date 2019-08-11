import * as React from "react";

import Layout from "../components/ui/Layout/Layout";

import { getCurrentUser } from "../lib/withAuth";

import HomepageHeader from "../components/ui/HomepageHeader/HomepageHeader";
import HomepageContent from "../components/ui/HomepageContent/HomepageContent";

class IndexPage extends React.Component<any, any> {
  static async getInitialProps(ctx: any) {
    const currentUser = await getCurrentUser(ctx.apolloClient);
    const isAuth = currentUser !== null;

    return {
      currentUser,
      isAuth
    };
  }
  render() {
    return (
      <Layout title="Zone" menuType="relative">
        <HomepageHeader isAuth={this.props.isAuth} />
        <HomepageContent />
      </Layout>
    );
  }
}

export default IndexPage;
