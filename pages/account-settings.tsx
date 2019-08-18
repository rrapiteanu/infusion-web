import * as React from "react";
import Layout from './../components/ui/Layout/Layout';
import { withAuthSync } from "../lib/auth";
import Me from "../components/ui/Me";
import FormDialog from "../components/modals/FormDialog";

const AccountSettings = () => {
  return (
    <Layout title="Account Settings">
      <h1>Account Settings</h1>
      <Me />
      <FormDialog/>
    </Layout>
  );
};


export default withAuthSync(AccountSettings);