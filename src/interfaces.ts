export interface AlertInfo {
  message: string
  variant: string
  // Variants :
  // 'primary'(blue)
  // 'secondary'(grey)
  // 'success'(green)
  // 'danger'(red)
  // 'warning'(yellow)
  // 'info'(light blue)
  // 'light'(white)
  // 'dark'(dark grey)
}

export type IBlog = {
  created_at: string
  description: string
  id: number
  name: string
  posts: IPost[]
  updated_at: string
  user: IUser
};

export type IPost = {
  blog: IBlog
  comments: Comment[]
  content: string
  created_at: string
  id: number
  picture: Picture
  isArchived: boolean
  summary: string
  title: string
  updated_at: string
}

export type IUser = {
  blogs: IBlog[]
  comments: Comment[]
  email: string
  id: number
  password: string
  pseudo: string
  role: string
}

export type Comment = {
  created_at: string
  id: number
  post: IPost
  text: string
  user: IUser
}

export type getBlog = {
  id: number;
  name: string;
  description: string;
  updated_at: string;
  user: {
    id: number;
    email: string;
  };
  posts: {
    id: number;
    title: string;
    summary: string;
    content: string;
    picture: Picture;
    updated_at: string;
  }[];
};

export type Picture = {
  id: number,
  name: string,
  link: string
}