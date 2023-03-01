export interface IUser {
  id: number,
  email: string,
  password: string
}


export interface ISign {
  title: string;
  adminFirstMessage?: string;
  adminSecondMessage?: string;
  signAction: string;
  onSign?: () => void;
  onTokenChange: (token?: string) => void;
  alternativeOption: string;

  // onCancelClicked: () => void;
  // onWilderUpdated: () => void;
}