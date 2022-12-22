import { gql } from "@apollo/client";

export const createUser = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data) {
      id
    }
  }
`;

export const SIGN_IN = gql`
mutation SignIn($data: UserInput!) {
  signIn(data: $data)
}
`