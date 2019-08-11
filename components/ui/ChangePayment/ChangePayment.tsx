import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";

const CHANGE_PAYMENT_METHOD_MUTATION = gql`
  mutation ChangePaymentMethod($token: String!, $ccLast4: String!) {
    changePaymentMethod(token: $token, ccLast4: $ccLast4) {
      accountType
      ccLast4
      subUntil
      subStatus
    }
  }
`;

class ChangePayment extends React.Component<any, any> {
  onToken = async data => {
    const { client } = this.props;
    const { id, card } = data;

    try {
      const {
        data: { changePaymentMethod }
      } = await client.mutate({
        mutation: CHANGE_PAYMENT_METHOD_MUTATION,
        variables: { token: id, ccLast4: card.last4 }
      });

    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <StripeCheckout
        label="Change Card"
        token={this.onToken}
        stripeKey="pk_test_EWtLWV3j9MvnoI9JmtGEcOMP004dmxHB96"
      />
    );
  }
}

export default withApollo(ChangePayment);
