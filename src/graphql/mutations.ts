import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data) {
      id
    }
  }
`;

export const CREATE_SUPERADMIN = gql`
mutation CreateSuperAdmin($data: UserInput!) {
  createSuperAdmin(data: $data) {
    id
  }
}
`;

export const LOGIN = gql`
mutation login($data: UserInput!) {
  login(data: $data)
}
`