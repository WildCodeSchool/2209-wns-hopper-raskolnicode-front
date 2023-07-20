export interface AlertInfo {
  message: string;
  variant: string;
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

export interface IBlog {
  created_at: string;
  description: string;
  id: number;
  name: string;
  updated_at: string;
  user: IUser;
  picture: IPicture;
}

export interface IPost {
  blog: IBlog;
  comments: IComment[];
  content: string;
  created_at: string;
  id: number;
  picture: IPicture;
  isArchived: boolean;
  summary: string;
  title: string;
  updated_at: string;
}

export interface IUser {
  blogs: IBlog[];
  comments: IComment[];
  email: string;
  id: number;
  password: string;
  pseudo: string;
  role: string;
  isPremium: boolean;
}

export interface IComment {
  created_at: string;
  id: number;
  post: IPost;
  text: string;
  user: IUser;
}

export interface getBlog {
  id: number;
  name: string;
  description: string;
  updated_at: string;
  user: {
    id: number;
    email: string;
    pseudo: string;
    isPremium: boolean;
  };
  picture: {
    id: number;
    name: string;
    link: string;
    updated_at: string;
  };
  posts: {
    id: number;
    title: string;
    summary: string;
    content: string;
    picture: IPicture;
    updated_at: string;
  }[];
}

export interface IPicture {
  id: number;
  name: string;
  link: string;
}
