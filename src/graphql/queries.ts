import { gql } from "@apollo/client";

export const GET_LOGGED_USER = gql`
  query LoggedUser {
    loggedUser {
      id
      email
      password
      pseudo
      role
      blogs {
        id
        name
        description
        updated_at
      }
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
        id
        email
        pseudo
      }
      picture {
        id
        name
        link
      }
      updated_at
      posts {
        id
        summary
        title
        content
        picture {
          id
          name
          link
        }
        updated_at
      }
    }
  }
`;

export const GET_BLOG = gql`
  query GetBlog($getBlogId: ID!) {
    getBlog(id: $getBlogId) {
      id
      name
      description
      updated_at
      user {
        id
        email
        pseudo
      }
      picture {
        id
        name
        link
      }
      posts {
        id
        title
        summary
        content
        picture {
          id
          name
          link
        }
        updated_at
      }
    }
  }
`;

export const GET_USERS = gql`
  query Users {
    getUsers {
      id
      email
      pseudo
      role
    }
  }
`;

export const GET_POST = gql`
  query GetPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      title
      isArchived
      content
      created_at
      summary
      updated_at
      blog {
        id
        user {
          id
        }
      }
      picture {
        link
        name
      }
      comments {
        id
        text
        user {
          pseudo
        }
        created_at
      }
    }
  }
`;
