import { gql } from "@apollo/client";

export const GET_LOGGED_USER = gql`
  query LoggedUser {
    loggedUser {
      id
      email
      pseudo
      isPremium
      blogs {
        name
        id
        description
        created_at
        updated_at
        picture {
          link
          id
          name
          updated_at
          created_at
        }
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
      picture {
        created_at
        id
        link
        name
        updated_at
      }
      user {
        id
        email
        pseudo
        isPremium
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

export const GET_BLOG_AND_POST = gql`
  query GetBlog($getBlogId: ID!) {
    getBlog(id: $getBlogId) {
      id
      name
      description
      updated_at
      user {
        id
      }
      picture {
        link
        name
        id
        created_at
        updated_at
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

export const GET_STRIPE_CLIENT_SECRET= gql`
  query CreatePaymentIntent {
    createPaymentIntent {
      clientSecret
    }
  }
`;

export const GET_STRIPE_PUBLIC_KEY = gql`
query GetStripePublicKey {
  getStripePublicKey {
    publicKey
  }
}`
