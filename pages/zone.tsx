import * as React from "react";
import { ZoneComponent } from "../generated/apolloComponents";
import { MyContext } from "../interfaces/MyContext";
import redirect from "../lib/redirect";
import ZoneCard from "../components/ui/ZoneCard/ZoneCard";
import Layout from "../components/ui/Layout/Layout";

import swal from "@sweetalert/with-react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";

const BottomBar = styled.div`
  position: fixed;
  bottom: 0px;
  right: 0px;
  left: 0px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
  background-color: white;
  border-top: 1px solid rgb(235, 235, 235);
`;

const ZoneInfo = styled(Grid)`
  height: 100%;
  width: 100%;
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ZoneName = styled.div`
  overflow-wrap: break-word;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.44444em;
  color: inherit;
  margin: 0px;
`;

const ZoneLocation = styled.div`
  overflow-wrap: break-word;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.33333em;
  color: inherit;
  margin: 0px;
`;

const ButtonContainer = styled.div`
  margin-right: 24px;
  min-width: 176px;
  height: 100%;
  width: 100%;
  display: flex;
  padding-right: 24px;
  justify-content: center;
`;

const ButtonText = styled.span`
  font-size: 16px;
  color: white;
  font-weight: 600;
`;

const Button = styled.div`
  position: relative;
  text-align: center;
  transition-property: background, border-color, color;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
  cursor: pointer;
  display: block;
  user-select: none;
  width: 100%;
  margin: 0px;
  text-decoration: none;
  padding: 10px;
  outline: none;
  border-radius: 4px;
  min-width: 71.1935px;
  border-width: 2px;
  border-style: solid;
  background: #a000ff;
  border-color: transparent;
`;

class Zone extends React.PureComponent<any, any> {
  static async getInitialProps({
    query: { id },
    apolloClient,
    ...ctx
  }: MyContext) {
    if (!id) {
      redirect(ctx, "/zones");
    }

    return {
      id
    };
  }

  getPass = () => {
    swal({
      title: "We are waiting for you",
      text: "Thank you!",
      icon: "success"
    });
  };

  render() {
    return (
      <ZoneComponent variables={{ id: parseInt(this.props.id, 10) }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          const { zone } = data;

          return (
            <Layout>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "40%"
                }}
              >
                <img src={zone.thumbnailUrl} />
                <img src={zone.thumbnailUrl} />
                <img src={zone.thumbnailUrl} />
                <img src={zone.thumbnailUrl} />
                <img src={zone.thumbnailUrl} />
                <img src={zone.thumbnailUrl} />
                <img src={zone.thumbnailUrl} />
                <img src={zone.thumbnailUrl} />
              </div>

              <BottomBar>
                <Grid container alignItems="center" justify="space-between">
                  <Grid item>
                    <ZoneInfo container>
                      <ZoneName>{zone.name}</ZoneName>
                      <ZoneLocation>{zone.address}</ZoneLocation>
                    </ZoneInfo>
                  </Grid>
                  <Grid item>
                    <ButtonContainer>
                      <Button onClick={this.getPass}>
                        <ButtonText>Get pass</ButtonText>
                      </Button>
                    </ButtonContainer>
                  </Grid>
                </Grid>
              </BottomBar>
            </Layout>
          );
        }}
      </ZoneComponent>
    );
  }
}

export default Zone;
