//@ts-nocheck
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Field, Formik } from "formik";
import Router from "next/router";
import React from "react";
import { InputField } from "../components/fields/InputField";
import { RegisterComponent } from "../generated/apolloComponents";
import InfusionButton from "./../components/ui/InfusionButton/InfusionButton";
import Layout from "./../components/ui/Layout/Layout";
import redirect from "../lib/redirect";
import { MyContext } from "../interfaces/MyContext";
import nextCookie from "next-cookies";

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

class RegisterPage extends React.Component<any, any> {
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
        <RegisterComponent>
          {register => (
            <main className={classes.main}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Formik
                  validateOnBlur={false}
                  validateOnChange={false}
                  onSubmit={async (data, { setErrors }) => {

                    const {email, password, lastName, firstName} = data;
                    const name = `${firstName} ${lastName}`;

                    try {
                      await register({
                        variables: {
                          email,
                          password,
                          name
                        }
                      });

                      Router.push("/check-email");
                    } catch (err) {
                      const errors: { [key: string]: string } = {};
                      err.graphQLErrors[0].validationErrors.forEach(
                        (validationErr: any) => {
                          Object.values(validationErr.constraints).forEach(
                            (message: any) => {
                              errors[validationErr.property] = message;
                            }
                          );
                        }
                      );
                      setErrors(errors);
                    }
                  }}
                  initialValues={{
                    email: "",
                    firstName: "",
                    lastName: "",
                    password: ""
                  }}
                >
                  {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className={classes.form}>
                      <Field
                        name="firstName"
                        label="First Name"
                        component={InputField}
                      />
                      <Field
                        name="lastName"
                        label="Last Name"
                        component={InputField}
                      />
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
                        Sign up
                      </InfusionButton>
                    </form>
                  )}
                </Formik>
              </Paper>
            </main>
          )}
        </RegisterComponent>
      </Layout>
    );
  }
}
//@ts-ignore
export default withStyles(styles)(RegisterPage);
