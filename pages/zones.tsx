import React from "react";
import Layout from "./../components/ui/Layout/Layout";
import { securePage } from "./../lib/withAuth";

import styled from "styled-components";
import { withApollo } from "react-apollo";

import { ZonesComponent } from "../generated/apolloComponents";
import ZoneCard from "../components/ui/ZoneCard/ZoneCard";
import Grid from "@material-ui/core/Grid";

const PageContent = styled(Grid)`
  margin-top: 50px;
`;

class ZonesPage extends React.Component<any, any> {
  render() {
    return (
      <Layout>
        <PageContent container>
          <ZonesComponent>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;

              const { zones } = data;

              return (
                <Grid container justify="center" alignItems="center">
                  {zones.map(zone => {
                    return <ZoneCard key={zone.id} {...zone} />;
                  })}
                </Grid>
              );
            }}
          </ZonesComponent>
        </PageContent>
      </Layout>
    );
  }
}

export default securePage(withApollo(ZonesPage));
