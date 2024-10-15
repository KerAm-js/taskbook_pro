import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export type TUserUpdates = [number] | [number, number];

export interface User {
  uid?: FirebaseAuthTypes.User["uid"];
  name?: FirebaseAuthTypes.User["displayName"];
  email?: FirebaseAuthTypes.User["email"];
  emailVerified?: FirebaseAuthTypes.User["emailVerified"];
  emailUpdatedAt?: TUserUpdates;
  nameUpdatedAt?: TUserUpdates;
  passwordUpdatedAt?: TUserUpdates;
}
