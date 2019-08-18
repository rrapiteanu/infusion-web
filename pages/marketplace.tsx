import React, { useState, useCallback } from "react";

import DashboardLayout from "../components/ui/Layout/DashboardLayout";
import { withAuthSync } from "../lib/auth";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const Marketplace = () => {
  return (
    <DashboardLayout>
      <h1>Marketplace</h1>
    </DashboardLayout>
  );
};

export default withAuthSync(Marketplace);
