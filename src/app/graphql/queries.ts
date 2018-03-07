import gql from 'graphql-tag';

export const Users = gql`
  query {
    users {
      id
      name
    }
  }
`;
