export interface IUser {
  id: number,
  email: string,
  password: string
}



export interface ISign {
  title: string;
  alternativeOption: string;
  adminFirstMessage?: string;
  adminSecondMessage?: string;
  signAction: string;
  onSign?: () => void

  // onCancelClicked: () => void;
  // onWilderUpdated: () => void;
}

