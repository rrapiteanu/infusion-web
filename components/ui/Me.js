import React, { useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import produce from "immer";
import { withApollo } from "react-apollo";
import QueryResult from "./QueryResult";
import Feed from "./Feed";
import {meQuery} from "../../graphql/user/query/me";

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

const Me = () => {
  const { ...queryResult } = useQuery(meQuery);

  return (
    <>
      <QueryResult {...queryResult}>
        {({ data }) => (
            <div>{JSON.stringify(data)}</div>
        )}
      </QueryResult>
    </>
  );
};

export default Me;
