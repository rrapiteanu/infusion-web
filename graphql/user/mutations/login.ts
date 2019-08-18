import { gql } from "apollo-boost";

export const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
      id
      token
    }
  }
`;