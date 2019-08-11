import React from "react";
import { withAuth } from "../../../lib/withAuth";

class TestAuth extends React.Component<any, any> {
  render() {  
    return <div>currentUser: {JSON.stringify(this.props.currentUser)}</div>;
  }
}

export default withAuth(TestAuth);
