import React from "react";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
// import BubbleButton from "../../../../utils/BubbleButton/BubbleButton";
import headerImage from "./header.png";
import Router from "next/router";

const BubbleButton = styled.button`
  font-weight: 500;
  color: white;
  background: #a000ff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const HeaderContent = styled.div`
  padding-top: 100px;
`;

const Container = styled.div`
  padding: 20px;
  margin-top: 20px;
  h1 {
    margin-bottom: 20px;
    font-weight: 400;
  }
  h4 {
    margin: 5px 0px;
    font-weight: 200;
  }
  .input {
    padding-top: 30px !important;
    margin-right: 20px !important;
    padding-bottom: 20px !important;
  }
  .apple {
    cursor: pointer;
    width: 195px;
    margin-right: 10px;
    @media only screen and (max-width: 1000px) {
      width: 120px;
    }
  }
  .google {
    cursor: pointer;
    width: 195px;
    @media only screen and (max-width: 1000px) {
      width: 120px;
    }
  }
  .ipad-container {
    height: 600px;
    @media only screen and (max-width: 477px) {
      height: 300px;
    }
  }

  .ipad-top {
    width: 35rem;
    height: auto;
    position: absolute;
    right: 0;

    @media only screen and (max-width: 477px) {
      width: 20rem;
      height: auto;
    }
  }
  .header-button {
    padding: 10px 14px;
    margin-right: 15px;
    @media only screen and (max-width: 477px) {
      margin-bottom: 15px;
    }
  }
`;

class HomepageHeader extends React.Component<any, any> {
  render() {
    const { isAuth } = this.props;
    return (
      <Container>
        <Grid container direction="row">
          <Grid item lg={2} md={1} sm={1} />
          <Grid item lg={5} md={6} sm={11} xs={12}>
            <HeaderContent>
              <h1>Fed up with working from coffee shops?</h1>
              <h4>
                Utilising space in London’s top restaurants, bars and hotels,
              </h4>
              <h4>we are changing co-working for good.</h4>

              <div style={{ marginTop: "30px" }}>
                {!isAuth && (
                  <BubbleButton
                    onClick={() => {
                      Router.push("/register");
                    }}
                    className="header-button"
                  >
                    Become a Member
                  </BubbleButton>
                )}

                {isAuth && (
                  <BubbleButton
                    onClick={() => {
                      Router.push("/zones");
                    }}
                    className="header-button"
                  >
                    Search zones
                  </BubbleButton>
                )}
              </div>
              <br />
            </HeaderContent>
          </Grid>

          <Grid item lg={5} md={6} sm={12} xs={12} className="ipad-container">
            {" "}
            <img className="ipad-top" src={headerImage} alt="Ipad" />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default HomepageHeader;
