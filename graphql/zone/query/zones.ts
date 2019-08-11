import gql from "graphql-tag";

export const zonesQuery = gql`
  query Zones {
    zones {
      id
      name
      description
      totalSpots
      address
      thumbnailUrl
    }
  }
`;
