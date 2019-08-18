import { gql } from "apollo-boost";

export const registerMutation = gql`
  mutation Register($email: String!, $name: String!, $password: String!){
    signUp(email: $email, name: $name, password: $password) {
      email
      gravatarMd5
      id
      name
      token
    }
  }
`;
