import gql from 'graphql-tag';

export const Users = gql`
  query {
    users {
      id
      name
    }
  }
`;

export const Me = gql`
  query {
    me {
      id
      name
    }
  }`;

