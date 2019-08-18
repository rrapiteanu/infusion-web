import React, { useState, useCallback } from "react";

import DashboardLayout from "../components/ui/Layout/DashboardLayout";
import { withAuthSync } from "../lib/auth";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const Pages = () => {
  return (
    <DashboardLayout>
      <h1>Pages</h1>
    </DashboardLayout>
  );
};

export default withAuthSync(Pages);
