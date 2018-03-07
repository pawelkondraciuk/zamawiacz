import gql from 'graphql-tag';

export const createUser = gql`
  mutation createUser($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

export const updateUser = gql`
  mutation updateUser($id: String!, $name: String!) {
    updateUser(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const removeUser = gql`
  mutation removeUser($id: String!) {
    removeUser(id: $id) {
      id
      name
    }
  }
`;
