export interface IUser {
  id: number;
  email: string;
  pseudo?: string;
  password: string;
}

export interface AlertInfo {
  message: string
  variant: string
}
