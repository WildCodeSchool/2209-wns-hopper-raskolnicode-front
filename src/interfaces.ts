export interface IUser {
  id: number;
  email: string;
  pseudo?: string;
  password: string;
}

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
