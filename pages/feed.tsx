import React, { useState, useCallback } from "react";
import Layout from "./../components/ui/Layout/Layout";
import { withAuthSync } from "../lib/auth";
import Posts from "../components/ui/Posts";
import InfusionLeftMenu from "../components/InfusionLeftMenu/InfusionLeftMenu";

import styled from "styled-components";
import InfusionRightMenu from "../components/InfusionRightMenu/InfusionRightMenu";
import InfusionForm from "../components/InfusionForm/InfusionForm";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/styles";
import DashboardLayout from "../components/ui/Layout/DashboardLayout";

export const CREATE_POST = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
      id
    }
  }
`;

const useStyles = makeStyles({
  feed: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  }
});

const Feed = () => {
  const classes = useStyles({});

  const [message, setMessage] = useState("");

  const updateText = useCallback(
    e => {
      setMessage(e.target.value);
    },
    [setMessage]
  );

  const [submit, { loading }] = useMutation(CREATE_POST, {
    onCompleted: () => setMessage("")
  });

  const sendPost = useCallback(() => {
    if (message === "" || loading) return;
    submit({ variables: { body: message } });
  }, [message, loading]);

  return (
    <DashboardLayout>
      <div className={classes.feed}>
        <InfusionForm
          isSending={loading}
          value={message}
          updateText={updateText}
          sendPost={sendPost}
        />
        <Posts />
      </div>

      <InfusionRightMenu />
    </DashboardLayout>
  );
};

export default withAuthSync(Feed);
