import gql from "graphql-tag";

export const zoneQuery = gql`
  query Zone($id: Int!) {
    zone(zoneId: $id) {
      id
      name
      description
      totalSpots
      address
      thumbnailUrl
    }
  }
`;
