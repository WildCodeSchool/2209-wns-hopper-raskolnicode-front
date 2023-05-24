import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($pseudo: String!) {
    updateUser(pseudo: $pseudo) {
      pseudo
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
`;

export const CREATE_USER_BY_ROLE = gql`
  mutation CreateUser($data: UserInput!) {
    createUserByRole(data: $data) {
      id
      email
      password
      role
    }
  }
`;

export const CREATE_BLOG_BY_USER = gql`
  mutation CreateBlogByUser($data: BlogInput!) {
    createBlogByUser(data: $data) {
      id
      name
      description
      user {
        id
        email
      }
    }
  }
`;

export const CREATE_BLOG = gql`
  mutation CreateBlog($data: BlogInput!) {
    createBlog(data: $data) {
      id
      picture {
        id
      }
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation updateBlog($date: updateBlogInput!) {
    id
    name
    description
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($blogId: ID!, $data: PostInput!) {
    createPost(blogId: $blogId, data: $data) {
      id
    }
  }
`;

export const CREATE_PICTURE = gql`
  mutation CreatePicture($data: PictureInput!) {
    createPicture(data: $data) {
      id
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($data: UpdatePostInput!, $postId: ID!) {
    updatePost(data: $data, id: $postId) {
      id
      title
      summary
      isArchived
      picture {
        name
        link
      }
    }
  }
`;

export const TOGGLE_POST_IS_ARCHIVED = gql`
mutation ToggleIsArchived($postId: ID!) {
  toggleIsArchived(id: $postId) {
    id
    isArchived
  }
}
`
export const DELETE_POST = gql`
mutation DeletePost($postId: ID!) {
  deletePost(id: $postId) {
    id
  }
}
`