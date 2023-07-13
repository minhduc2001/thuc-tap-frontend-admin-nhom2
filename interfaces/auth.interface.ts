export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  rePassword?: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}
