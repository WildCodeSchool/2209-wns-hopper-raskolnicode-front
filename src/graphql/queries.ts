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

export const GET_BLOG = gql`
  query GetBlog($postId: ID!, $getBlogId: ID!) {
    getBlog(id: $getBlogId) {
      id
      name
      description
      updated_at
      user {
        id
        email
      }
      posts {
        id
        title
        summary
        content
        image
        updated_at
      }
    }
  }
`;
