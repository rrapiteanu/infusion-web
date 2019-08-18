import React, { useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import produce from "immer";
import { withApollo } from "react-apollo";
import QueryResult from "./QueryResult";
import Feed from "./Feed";

export const GET_POSTS = gql`
  query GetPosts {
    posts {
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

export const POSTS_SUBSCRIPTION = gql`
  subscription onPostCreated {
    postCreated {
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

const Posts = () => {
  const { subscribeToMore, ...queryResult } = useQuery(GET_POSTS, {
    ssr: false
  });
  const subscribeToNew = useCallback(
    () =>
      subscribeToMore({
        document: POSTS_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newPost = subscriptionData.data.postCreated;

          // Check that we don't already have the
          // post stored.
          if (prev.posts.find(post => post.id === newPost.id)) {
            return prev;
          }

          return produce(prev, next => {
            next.posts.unshift(newPost);
          });
        }
      }),
    []
  );

  return (
    <>
      <QueryResult {...queryResult}>
        {({ data }) => (
          <Feed
            feedType="post"
            items={data.posts}
            subscribeToNew={subscribeToNew}
          />
        )}
      </QueryResult>
    </>
  );
};

export default React.memo(Posts);
