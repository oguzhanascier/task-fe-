export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUserInformation {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
}

export interface IStoreInformation {
  sellerId: string;
  marketplace: string;
}

export interface IAuthState {
  loginUser: ILoginUser | null;
  userInformation: IUserInformation | null;
  storeInformation: IStoreInformation | null;
}
