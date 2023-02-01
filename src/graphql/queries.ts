import { gql } from "@apollo/client";

export const GET_LOGGED_USER = gql`
  query LoggedUser {
    loggedUser {
      id
      email
      password
      role
    }
  }
`;

export const HAS_SUPERADMIN = gql`
  query HasSuperAdmin {
    hasSuperAdmin {
      id
    }
  }
`;

export const GET_BLOGS = gql`
  query GetBlogs {
    blogs {
      description
      name
      user {
        email
      }
      updated_at
    }
  }
`;
