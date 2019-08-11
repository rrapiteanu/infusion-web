import Head from "next/head";
import * as React from "react";
import styled from "styled-components";

import BasicMenu from "./../Menu/BasicMenu";

type Props = {
  title?: string;
  menuType?: string;
};

const Container = styled("div")`
  min-height: 100vh;
`;

const Content = styled("div")`
  /* padding: 0px 50px; */
`;

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "Zone",
  menuType = "fixed"
}) => (
  <Container>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <BasicMenu type={menuType} />
    <Content>{children}</Content>
  </Container>
);

export default Layout;
