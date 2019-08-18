import React from "react";
import InfusionLoader from "./InfusionLoader";
// import { ErrorMessage, Loading } from "components";

const QueryResult = ({ loading, error, data, children }) => {
  if (loading) {
    return <InfusionLoader />;
  } else if (error) {
    return <p>EROARE</p>;
  } else {
    return children({ data });
  }
};

export default QueryResult;
