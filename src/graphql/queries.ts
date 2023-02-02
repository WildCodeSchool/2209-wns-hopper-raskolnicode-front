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
    getBlogs {
      id
      description
      name
      user {
        email
      }
      updated_at
      posts {
        id
        summary
        title
        content
        image
        updated_at
      }
    }
  }
`;

export const GET_POSTS_BY_BLOG = gql`
  query GetPosts {
    getPosts {
      summary
      title
      id
      content
      image
      updated_at
    }
  }
`;

export const GET_USERS = gql`
query Users {
  getUsers {
    id
    email
    role
  }
}`
