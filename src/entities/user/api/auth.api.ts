import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {TApiMessage, User, UserUpdates} from '../model/types';
import * as Keychain from 'react-native-keychain';
import {SEND_EMAIL_VERIFICATION_ACTION} from '../config/consts';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {checkCanUpdate, getNewUpdatedAt} from '../lib/checkCanUpdate';

type TSigninCredentials = {
  auth: FirebaseAuthTypes.Module;
  email: string;
  password: string;
};

type TChangeNameCredentials = {
  auth: FirebaseAuthTypes.Module;
  user: User;
  password: string;
  name: string;
  usersCollection: FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>;
};

export const changeNameThunk = createAsyncThunk<
  TApiMessage & {name: string},
  TChangeNameCredentials,
  {rejectValue: TApiMessage}
>(
  'auth/change-name',
  async ({auth, user, usersCollection, name, password}, thunkApi) => {
    try {
      if (!user.email) throw new Error();
      const authorization = await auth.signInWithEmailAndPassword(
        user.email,
        password,
      );
      const response = await usersCollection.doc(authorization.user.uid).get();
      const userInfo = response.data() as UserUpdates | undefined;
      const canUpdate = checkCanUpdate(userInfo?.nameUpdatedAt);
      if (canUpdate) {
        await authorization.user.updateProfile({displayName: name});
        const nameUpdatedAt: UserUpdates['emailUpdatedAt'] = getNewUpdatedAt(
          userInfo?.nameUpdatedAt,
        );
        usersCollection
          .doc(authorization.user.uid)
          .set({...userInfo, nameUpdatedAt});
        return thunkApi.fulfillWithValue({
          title: 'success',
          message: 'nameSuccessfullyChanged',
          name,
        });
      } else {
        return thunkApi.rejectWithValue({
          title: 'error',
          message: 'youHaveAlreadyChangedName',
        });
      }
    } catch (error: any) {
      let message;
      if (error.code === 'auth/wrong-password') {
        message = 'wrongPassword';
      } else if (error.code === 'auth/network-request-failed') {
        message = 'noInternetConnection';
      } else {
        message = 'somethingWentWrong';
      }
      return thunkApi.rejectWithValue({
        title: 'error',
        message,
      });
    }
  },
);

export const signoutThunk = createAsyncThunk<
  undefined,
  {auth: FirebaseAuthTypes.Module},
  {rejectValue: TApiMessage}
>('auth/signout', async ({auth}, thunkApi) => {
  try {
    await auth.signOut();
  } catch (error: any) {
    let message;
    if (error.code === 'auth/network-request-failed') {
      message = 'noInternetConnection';
    } else {
      message = 'somethingWentWrong';
    }
    return thunkApi.rejectWithValue({
      title: 'error',
      message,
    });
  }
});

export const signinThunk = createAsyncThunk<
  User,
  TSigninCredentials,
  {rejectValue: TApiMessage}
>('auth/signin', async (credentials, thunkApi) => {
  try {
    const response = await credentials.auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    );
    if (response.user.emailVerified) {
      const {uid, displayName, email, emailVerified} = response.user;
      await Keychain.setGenericPassword(uid, credentials.password);
      const user: User = {
        uid,
        email,
        emailVerified,
        name: displayName,
      };
      return thunkApi.fulfillWithValue(user);
    } else {
      return thunkApi.rejectWithValue({
        title: 'emailIsNotConfirmed',
        message: 'shouldWeSendConfirmationLink',
        action: SEND_EMAIL_VERIFICATION_ACTION,
      });
    }
  } catch (error: any) {
    if (error.code === 'auth/network-request-failed') {
      return thunkApi.rejectWithValue({
        title: 'error',
        message: 'noInternetConnection',
      });
    } else if (
      error.code === 'auth/invalid-credential' ||
      error.code === 'auth/user-not-found' ||
      error.code === 'auth/wrong-password'
    ) {
      return thunkApi.rejectWithValue({
        title: 'error',
        message: 'wrongEmailOrPassword',
      });
    } else {
      return thunkApi.rejectWithValue({
        title: 'error',
        message: 'somethingWentWrong',
      });
    }
  }
});
