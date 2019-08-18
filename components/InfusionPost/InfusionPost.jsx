//@ts-nocheck
import React, { Fragment, useState, useCallback } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import produce from "immer";

import { MoreVertOutlined, Favorite } from "@material-ui/icons";
import {
  Avatar,
  CardHeader,
  IconButton,
  Divider,
  Card,
  Typography,
  CardContent,
  Link,
  makeStyles
} from "@material-ui/core";
import { getIntials } from "../../lib/utils";

import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import QueryResult from "../ui/QueryResult";
import Subscriber from "../../containers/Subscriber";

import Timeago from "react-timeago";

export const GET_POST = gql`
  query GetPost($id: String!) {
    post(id: $id) {
      id
      body
      insertedAt
      user {
        id
        name
        gravatarMd5
      }
      comments {
        id
        body
        insertedAt
        user {
          id
          name
          gravatarMd5
        }
      }
    }
  }
`;

export const COMMENTS_SUBSCRIPTION = gql`
  subscription onCommentCreated($postId: String!) {
    commentCreated(postId: $postId) {
      id
      body
      insertedAt
      user {
        id
        name
        gravatarMd5
      }
    }
  }
`;

const useStyles = makeStyles({
  card: {
    width: 500,
    marginBottom: 24
  },
  divider: {
    marginTop: 16,
    marginBottom: 16
  },
  dividerVertical: {
    width: 1,
    height: 24
  },
  row: {
    display: "flex",
    alignItems: "center"
  },
  commentContainer: {
    display: "flex",
    marginBottom: 16
  },
  commentBody: {
    marginTop: 8
  },
  body: {
    wordBreak: "break-word"
  },
  commentContent: {
    padding: 8,
    flexGrow: 1,
    marginLeft: 16,
    borderRadius: 4,
    backgroundColor: "#F4F6F8"
  },
  commentDate: {
    marginLeft: "auto"
  }
});

export const CREATE_COMMENT = gql`
  mutation CreateComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
    }
  }
`;

const InfusionPost = ({ user, insertedAt, body, id }) => {
  const classes = useStyles({});

  const [input, setInput] = useState("");

  const { subscribeToMore, ...queryResult } = useQuery(GET_POST, {
    variables: { id }
  });

  const subscribeToNew = useCallback(
    () =>
      subscribeToMore({
        document: COMMENTS_SUBSCRIPTION,
        variables: { postId: id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newComment = subscriptionData.data.commentCreated;

          // Check that we don't already have
          // the comment stored.
          if (
            prev.post.comments.find(comment => comment.id === newComment.id)
          ) {
            return prev;
          }

          return produce(prev, next => {
            next.post.comments.push(newComment);
          });
        }
      }),
    [id]
  );

  const [submit, { loading }] = useMutation(CREATE_COMMENT, {
    onCompleted: () => setInput("")
  });

  const onInputChange = useCallback(
    e => {
      setInput(e.target.value);
    },
    [setInput]
  );

  const sendComment = useCallback(() => {
    // const comment = {
    //   author: {
    //     name: "robert rapiteanu",
    //     avatar: ""
    //   },
    //   body: this.state.inputValue,
    //   createdAt: Date.now()
    // };

    if (input === "" || loading) return;
    submit({ variables: { body: input, postId: id } });
  }, [input]);

  return (
    <Subscriber subscribeToNew={subscribeToNew}>
      <QueryResult {...queryResult}>
        {({ data }) => (
          <Card className={classes.card}>
            <CardHeader
              avatar={<Avatar>{getIntials(user.name)}</Avatar>}
              action={
                <IconButton aria-label="settings">
                  <MoreVertOutlined />
                </IconButton>
              }
              title={
                <Typography>
                  <Link
                    href={`/user/${user.id}`}
                    variant="h6"
                    color="textPrimary"
                  >
                    {user.name}
                  </Link>
                </Typography>
              }
              subheader={<Timeago date={`${insertedAt}Z`} />}
            />
            <CardContent>
              <Typography className={classes.body} variant="body1" gutterBottom>
                {body}
              </Typography>
              <div className={classes.row}>
                {/* <IconButton size="small" aria-label="add to favorites">
                  <Favorite style={{ color: "#e53935" }} />
                </IconButton>
                <Typography variant="h6">25</Typography> */}
              </div>

              {data.post.comments.length > 0 && (
                <Fragment>
                  <Divider className={classes.divider} />
                  {data.post.comments.map(comment => (
                    <Comment key={comment.id} {...comment} />
                  ))}
                </Fragment>
              )}

              <CommentForm
                sendComment={sendComment}
                onInputChange={onInputChange}
                inputValue={input}
              />
            </CardContent>
          </Card>
        )}
      </QueryResult>
    </Subscriber>
  );
};

export default React.memo(InfusionPost);
