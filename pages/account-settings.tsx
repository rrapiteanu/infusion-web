import React from "react";
import Layout from "./../components/ui/Layout/Layout";
import { securePage } from "./../lib/withAuth";
import gql from "graphql-tag";

import styled from "styled-components";
import StripeCheckout from "../components/ui/StripeCheckout/StripeCheckout";
import ChangePayment from "../components/ui/ChangePayment/ChangePayment";
import { withApollo } from "react-apollo";

import { meQuery } from "../graphql/user/query/me";
import { MeComponent } from "../generated/apolloComponents";

import swal from "@sweetalert/with-react";
import Divider from "@material-ui/core/Divider";

import Paper from "@material-ui/core/Paper";

import dayjs from "dayjs";

const CANCEL_SUB_MUTATION = gql`
  mutation {
    cancelSubscription {
      accountType
      ccLast4
      subUntil
      subStatus
    }
  }
`;

const ACTIVATE_SUB_MUTATION = gql`
  mutation {
    activateSubscription {
      accountType
      ccLast4
      subUntil
      subStatus
    }
  }
`;

const Container = styled(Paper)`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin: 0 auto;
  margin-top: 50px;
  padding: 30px;
  min-width: 300px;
  min-height: 400px;
  max-width: 1024px;
`;

const ToastContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Toast = styled.div`
  background: #03aefd;
  display: table;
  width: 100%;
  margin: 10px 0;
  border-radius: 2px;
`;

const ToastContent = styled.div`
  font-size: 16px;
  display: table-cell;
  vertical-align: middle;
  padding: 20px 15px;
  color: #fff;
`;

const Avatar = styled.img`
  height: 100px;
  width: 100px;
`;

class AccountSettingsPage extends React.Component<any, any> {
  cancelSub = async () => {
    const { client } = this.props;

    try {
      swal(<div>Processing...</div>, {
        buttons: false,
        closeOnClickOutside: false,
        closeOnEsc: false
      });

      await client.mutate({
        mutation: CANCEL_SUB_MUTATION,
        update: (store, { data: { cancelSubscription } }) => {
          const { me } = client.readQuery({ query: meQuery });

          const {
            accountType,
            ccLast4,
            subStatus,
            subUntil
          } = cancelSubscription;

          const newData = {
            me: {
              ...me,
              accountType,
              ccLast4,
              subStatus,
              subUntil
            }
          };

          client.writeQuery({ query: meQuery, data: newData });
        }
      });

      swal({
        title: "We are sorry to see go!",
        text: ":(",
        icon: "info",
        buttons: false,
        timer: 1000
      });
    } catch (error) {
      console.log(error);
    }
  };

  activateSub = async () => {
    const { client } = this.props;

    try {
      swal(<div>Processing...</div>, {
        buttons: false,
        closeOnClickOutside: false,
        closeOnEsc: false
      });

      await client.mutate({
        mutation: ACTIVATE_SUB_MUTATION,
        update: (store, { data: { activateSubscription } }) => {
          const { me } = client.readQuery({ query: meQuery });

          const {
            accountType,
            ccLast4,
            subStatus,
            subUntil
          } = activateSubscription;

          const newData = {
            me: {
              ...me,
              accountType,
              ccLast4,
              subStatus,
              subUntil
            }
          };

          client.writeQuery({ query: meQuery, data: newData });
        }
      });
      swal({
        title: "You resubscribed!",
        text: "Thank you!",
        icon: "success",
        buttons: false,
        timer: 1000
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { currentUser } = this.props;

    if (!currentUser) return null;

    const {
      email,
      firstName,
      lastName,
      accountType,
      ccLast4,
      subStatus,
      subUntil,
      profilePicture
    } = currentUser;

    const dueDate = dayjs.unix(subUntil).format("DD-MM-YYYY");
    const isPaused = subStatus === "paused";
    const hasPaymentMethod = ccLast4 !== null;
    return (
      <Layout>
        <Container>
          <h1>Account</h1>
          <ToastContainer>
            {isPaused && (
              <Toast>
                <ToastContent>
                  Your membership will be canceled at the end of your current
                  billing period.
                </ToastContent>
              </Toast>
            )}
          </ToastContainer>
          <Avatar src={profilePicture} />
          <p>Email: {email}</p>
          <p>
            Name: {firstName} {lastName}
          </p>
          <Divider variant="middle" />
          <p>Plan Details: {accountType}</p>
          {hasPaymentMethod && <p>Payment method: **** **** **** {ccLast4}</p>}
          {isPaused && <p>Your membership will be canceled on: {dueDate}</p>}
          {subStatus === "active" && <p>Next billing date: {dueDate}</p>}
          {hasPaymentMethod && <ChangePayment />}
          {!hasPaymentMethod && <StripeCheckout />}

          {isPaused && <button onClick={this.activateSub}>Resubscribe</button>}
          {!isPaused && accountType !== "free" && (
            <button onClick={this.cancelSub}>Cancel Subscription</button>
          )}
        </Container>
      </Layout>
    );
  }
}

export default securePage(withApollo(AccountSettingsPage));
