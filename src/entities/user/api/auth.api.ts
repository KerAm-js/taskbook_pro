import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {TApiMessage, User} from '../model/types';
import * as Keychain from 'react-native-keychain';
import {SEND_EMAIL_VERIFICATION_ACTION} from '../config/consts';
import analytics from '@react-native-firebase/analytics';
import { logEvent } from '@/shared';

type TSigninCredentials = {
  auth: FirebaseAuthTypes.Module;
  email: string;
  password: string;
};

export const signoutThunk = createAsyncThunk<
  undefined,
  {auth: FirebaseAuthTypes.Module},
  {rejectValue: TApiMessage}
>('auth/signout', async ({auth}, thunkApi) => {
  try {
    const email = auth.currentUser?.email;
    const uid = auth.currentUser?.uid;
    await auth.signOut();
    logEvent('signout', {
      email,
      uid,
    });
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
      await analytics().logLogin({
        method: response.user.providerId,
      });
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
