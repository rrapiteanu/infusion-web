import gql from "graphql-tag";

export const meQuery = gql`
  query Me {
    currentUser {
      email
      gravatarMd5
      id
      name
      token
    }
  }
`;
