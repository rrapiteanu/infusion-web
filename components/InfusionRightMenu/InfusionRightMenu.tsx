import React, { Component } from "react";
import styled from "styled-components";
import FriendsSuggestions from "../FriendsSuggestions/FriendsSuggestions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 305px;
  @media (max-width: 768px) {
    display: none;
  }
  .right-menu-sub {
    padding-top: 30px;
    height: 350px;
    margin-bottom: 30px;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0 -1px 1px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
    .portlet {
      padding: 0px 20px 15px;
      .nav {
        padding-left: 0;
        a {
          position: relative;
          display: block;
          padding: 10px 15px;
        }
      }
      .members {
        display: flex;
        flex-direction: column;
        .member {
          position: relative;
          padding: 5px 2px;
          display: flex;
          align-items: center;
          .name {
            display: flex;
            align-items: center;
            color: #777777;
            font-weight: 600;
            margin-left: 20px;
            line-height: 45px;
            cursor: pointer;
          }
          .action-button {
            color: #c1c1c1;
            font-size: 15px;
            border-radius: 50%;
            cursor: pointer;
            height: 30px;
            position: absolute;
            right: 5px;
            width: 30px;
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;
            border: 0.2px solid #efefef;
            margin-left: 20px;
            box-shadow: 0 -1px 1px 0 rgba(0, 0, 0, 0.05),
              0 1px 2px 0 rgba(0, 0, 0, 0.2);
            svg {
              font-weight: bold;
            }
          }
        }
      }
      .portlet-title {
        padding-bottom: 10px;

        .caption {
          line-height: 18px;
        }

        .font-blue-madison {
          font-weight: bold;
          color: #578ebe !important;
        }
      }
    }
  }
`;

export default class InfusionRightMenu extends Component {
  render() {
    return (
      <Container>
        <FriendsSuggestions />
      </Container>
    );
  }
}
