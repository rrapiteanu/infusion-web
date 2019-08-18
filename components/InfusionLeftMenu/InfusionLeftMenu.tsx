import React, { Component } from "react";
import Link from "next/link";
import { Avatar } from "@material-ui/core";
import { getIntials } from "../../lib/utils";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  /* left: 200px; */
  display: flex;
  flex-direction: column;
  width: 258px;
  .left-menu-sub {
    height: 100vh;
    padding-top: 30px;
    margin-bottom: 30px;

    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0 -1px 1px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.2);

    .portlet {
      padding: 0px 20px 15px;

      .nav {
        padding-left: 0;
      }
      .nav > li > a {
        position: relative;
        display: block;
        padding: 10px 15px;
      }
    }

    .portlet > .portlet-title > .caption {
      float: left;
      font-size: 18px;
      line-height: 18px;
      padding: 10px 0;
    }
    .font-blue-madison {
      color: #578ebe !important;
    }

    .profile-usertitle {
      text-align: center;
      margin-top: 20px;
      .profile-usertitle-name {
        color: #5a7391;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 7px;
      }
      .profile-usertitle-job {
        text-transform: uppercase;
        color: #5b9bd1;
        font-size: 13px;
        font-weight: 800;
        margin-bottom: 7px;
      }
    }
    .profile-usermenu {
      margin-top: 30px;
      padding-bottom: 20px;
      .nav {
        padding-left: 0;
        display: flex;
        flex-direction: column;
        margin-bottom: 0;
        list-style: none;
      }
      .profile-usermenu .link {
        border-bottom: 1px solid #f0f4f7;
      }
      .profile-usermenu .link .active a {
        color: #5b9bd1;
        background-color: #f6f9fb;
        border-left: 2px solid #5b9bd1;
        margin-left: -2px;
      }
      .profile-usermenu .link a {
        color: #93a3b5;
        font-size: 16px;
        font-weight: 400;
      }
      .nav .link > a {
        position: relative;
        display: block;
        padding: 10px 15px;
      }
      .link {
        border-bottom: 1px solid #f0f4f7;
      }
    }

    .profile-userpic .avatar {
      float: none;
      margin: 0 auto;
      width: 125px;
      height: 125px;
      font-size: ${Math.floor(125 / 3)}px;
      border-radius: 50% !important;
    }
  }
`;

const InfusionLeftMenu = React.memo(() => {
  const userProfile = {
    displayName: "Robert Rapiteanu"
  };

  return (
    <Container>
      <div className="left-menu-sub">
        <div className="profile-userpic">
          <Avatar className="avatar" alt="Profile">
            {getIntials(userProfile.displayName)}
          </Avatar>
        </div>

        <div className="profile-usertitle">
          <div className="profile-usertitle-name">
            {userProfile.displayName}
          </div>
          <div className="profile-usertitle-job">{/* Software Engineer */}</div>
        </div>

        <div className="profile-usermenu" style={{ paddingBottom: 0 }}>
          <div className="nav">
            <div className="link">
              <Link href="/">News Feed</Link>
            </div>
            <div className="link">
              <Link href="/">News Feed</Link>
            </div>
            <div className="link">
              <Link href="/">News Feed</Link>
            </div>
            <div className="link">
              <Link href="/">News Feed</Link>
            </div>
            <div className="link active">
              <Link href="/">News Feed</Link>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="left-menu-sub" style={{height: "300px"}}>
                    <div className="portlet">
                        <div className="portlet-title">
                            <div className="caption">
                                <span className="font-blue-madison">SHORTCUTS</span>
                            </div>
                        </div>

                        <div className="portlet-body">
                            <ul className="nav nav-pills nav-stacked" style={{maxWidth: "100%"}}>
                                <li>
                                    <a>
                                Math Project Group
                                    </a>
                                </li>
                                <li>
                                    <a>
                                Harvard CS410
                                    </a>
                                </li>
                                <li>
                                    <a>
                                Web Development Europe
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>     
                </div>    */}
    </Container>
  );
});

export default InfusionLeftMenu;
