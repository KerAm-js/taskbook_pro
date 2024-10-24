import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type UserUpdates = {
  emailUpdatedAt?: TUserUpdates;
  nameUpdatedAt?: TUserUpdates;
  passwordUpdatedAt?: TUserUpdates;
};

export type User = {
  uid?: FirebaseAuthTypes.User['uid'];
  name?: FirebaseAuthTypes.User['displayName'];
  email?: FirebaseAuthTypes.User['email'];
  emailVerified?: FirebaseAuthTypes.User['emailVerified'];
};

export type TUserUpdates = [number] | [number, number];

export type TApiMessage = {
  title: string;
  message: string;
  action?: string;
  status?: 'rejected' | 'resolved';
};

export interface IUserState extends User {
  loading: boolean;
  error: TApiMessage | null;
  success: TApiMessage | null;
}
