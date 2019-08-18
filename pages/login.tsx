import Avatar from "@material-ui/core/Avatar";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Field, Formik } from "formik";
import React from "react";
import { InputField } from "../components/fields/InputField";
import { LoginComponent } from "../generated/apolloComponents";
import InfusionButton from "./../components/ui/InfusionButton/InfusionButton";
import Layout from "./../components/ui/Layout/Layout";
import { MyContext } from "../interfaces/MyContext";
import { setAuth } from '../lib/auth';
import nextCookie from "next-cookies";

import redirect from "../lib/redirect";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    marginTop: theme.spacing(3)
  }
});

class LoginPage extends React.Component<any, any> {
  static async getInitialProps({ apolloClient, ...ctx }: MyContext) {
    const { token } = nextCookie(ctx);

    if (token) {
      redirect(ctx, "/");
    }
    return {
      isAuth: false
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Layout menuType="relative">
        <LoginComponent>
          {login => (
            <main className={classes.main}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Formik
                  validateOnBlur={false}
                  validateOnChange={false}
                  onSubmit={async (data, { setErrors }) => {

                    try {
                      const response = await login({
                        variables: data
                      });

                      if (response && response.data && response.data.authenticate) {
                        const { token } = response.data.authenticate;
                        setAuth({ token });
                      }

                    } catch (error) {

                      if(error.graphQLErrors[0].message)
                      {
                        setErrors({
                          password: error.graphQLErrors[0].message
                        });
                      }
                
                      return;
                    }
          
                   

                    // if (response && response.data && !response.data.authenticate) {
                  
                    //   return;
                    // }

                    // console.log(response);

                    // window.location.href = "/";
                  }}
                  initialValues={{
                    email: "",
                    password: ""
                  }}
                >
                  {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className={classes.form}>
                      <Field
                        name="email"
                        type="email"
                        label="Email Address"
                        component={InputField}
                      />
                      <Field
                        name="password"
                        label="Password"
                        type="password"
                        component={InputField}
                      />
                      <InfusionButton
                        type="submit"
                        fullWidth
                        color="primary"
                        className={classes.submit}
                      >
                        Sign in
                      </InfusionButton>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      />
                    </form>
                  )}
                </Formik>
              </Paper>
            </main>
          )}
        </LoginComponent>
      </Layout>
    );
  }
}

//@ts-ignore
export default withStyles(styles)(LoginPage);
