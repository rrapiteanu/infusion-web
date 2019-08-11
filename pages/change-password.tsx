import { Field, Formik } from "formik";

import Router from "next/router";
import React from "react";
import { InputField } from "../components/fields/InputField";
import { ChangePasswordComponent } from "../generated/apolloComponents";
import Layout from "./../components/ui/Layout/Layout";

const ChangePassword = ({ token }: { token: string }) => {
  return (
    <Layout title="Change Password page">
      <ChangePasswordComponent>
        {changePassword => (
          <Formik
            onSubmit={async data => {
              try {
                await changePassword({
                  variables: {
                    data: {
                      password: data.password,
                      token
                    }
                  }
                });
                Router.push("/");
              } catch (error) {
                Router.push("/");
              }
            }}
            initialValues={{
              password: ""
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="password"
                  placeholder="password"
                  component={InputField}
                  type="password"
                />
                <button type="submit">change password</button>
              </form>
            )}
          </Formik>
        )}
      </ChangePasswordComponent>
    </Layout>
  );
};

ChangePassword.getInitialProps = ({ query: { token } }) => {
  return {
    token
  };
};

export default ChangePassword;
