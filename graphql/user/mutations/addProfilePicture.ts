import { gql } from "apollo-boost";

export const addProfilePictureMutation = gql`
  mutation addProfilePicture($file: Upload!) {
    addProfilePicture(picture: $file)
  }
`;
