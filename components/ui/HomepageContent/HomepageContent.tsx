import React from "react";
// import "./HomepageContent.css";

import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import community from "./community.png";
import benefits from "./benefits.png";

const Container = styled.div`
  margin-top: 100px;
  .sections-1 {
    margin-bottom: 240px;
    @media only screen and (max-width: 1000px) {
      margin-bottom: 20px;
    }
    .home-image-right {
      height: 230px;
      margin-right: 205px;
      @media only screen and (max-width: 960px) {
        display: none;
      }
    }
    .home-image-left {
      height: 270px;
      margin-left: 205px;
      @media only screen and (max-width: 960px) {
        display: none;
      }
    }
    h4 {
      line-height: 30px;
      font-size: 20px;
      font-weight: 400;
    }
    .section {
      padding-left: 50px;
      margin: 0 auto;
      color: $primaryGrey;
      max-width: 500px;
      @media only screen and (max-width: 1400px) {
        max-width: 350px;
      }
      .circle {
        background: -webkit-linear-gradient(right, #33ddf0 0%, #17b9dc 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        position: relative;
        top: 10px;
        left: -60px;
        font-size: 43px;
        color: $primaryBlue;
        @media only screen and (max-width: 400px) {
          left: -40px;
        }
      }
      h2 {
        position: relative;
        display: inline;
        font-weight: 500;
      }
    }
  }
  .ipads {
    left: 0;
    width: 100%;
    height: auto;
  }
`;

class HomepageContent extends React.Component {
  render() {
    return (
      <Container>
        <div className="sections-1">
          <Grid container direction="row">
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <img className="home-image-left" src={benefits} alt="Coins" />
            </Grid>

            <Grid item lg={8} md={8} sm={12} xs={12}>
              <div className="section">
                <h2>Benefits</h2>
                <h4>
                  For just £95 a month, members can enter any of our Zones for
                  no additional charge. You’ll have access to WiFi, sockets,
                  refreshments and a community of like minded individuals. All
                  of our Zones are vetted by our team to ensure they meet our
                  high standards.
                </h4>
              </div>
            </Grid>
          </Grid>
        </div>

        <div className="sections-1">
          <Grid container direction="row" className="middle-lg middle-md">
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <div className="section">
                <h2>Community</h2>
                <h4>
                  Community is at the heart of everything we do. We use our
                  Zones to encourage collaboration and communication and have
                  built a fantastic product to aid in facilitating this.
                </h4>
              </div>
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
              <img
                className="home-image-right"
                src={community}
                alt="Students"
              />
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default HomepageContent;
