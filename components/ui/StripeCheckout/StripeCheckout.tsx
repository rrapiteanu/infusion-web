import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import swal from "@sweetalert/with-react";
import { meQuery } from "../../../graphql/user/query/me";

const CREATE_SUB_MUTATION = gql`
  mutation CreateSubscription($token: String!, $ccLast4: String!) {
    createSubscription(token: $token, ccLast4: $ccLast4) {
      accountType
      ccLast4
      subUntil
      subStatus
    }
  }
`;

class TakeMoney extends React.Component<any, any> {
  onToken = async data => {
    const { client } = this.props;
    const { id, card } = data;

    try {
      swal(<div>Processing...</div>, {
        buttons: false,
        closeOnClickOutside: false,
        closeOnEsc: false
      });

      await client.mutate({
        mutation: CREATE_SUB_MUTATION,
        variables: { token: id, ccLast4: card.last4 },
        update: (store, { data: { createSubscription } }) => {
          const { me } = client.readQuery({ query: meQuery });

          const {
            accountType,
            ccLast4,
            subStatus,
            subUntil
          } = createSubscription;

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
        title: "You upgraded to Premium",
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
    return (
      <StripeCheckout
        token={this.onToken}
        label="Upgrade to premium"
        stripeKey="pk_test_EWtLWV3j9MvnoI9JmtGEcOMP004dmxHB96"
        amount={9000}
      />
    );
  }
}

export default withApollo(TakeMoney);
