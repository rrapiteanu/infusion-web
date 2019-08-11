import gql from "graphql-tag";

export const meQuery = gql`
  query Me {
    me {
      id
      email
      firstName
      lastName
      name
      accountType
      ccLast4
      profilePicture
      subUntil
      subStatus
    }
  }
`;
