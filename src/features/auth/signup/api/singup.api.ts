import { TApiMessage } from '@/entities/user';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

type TSignupCredentials = {
  auth: FirebaseAuthTypes.Module;
  email: string;
  name: string;
  password: string;
};

export const signup = async (
  credentials: TSignupCredentials,
): Promise<TApiMessage> => {
  try {
    const {email, name, password, auth} = credentials;
    const response = await auth.createUserWithEmailAndPassword(email, password);
    await response.user.updateProfile({displayName: name});
    await response.user.sendEmailVerification();
    return {
      title: 'emailConfirmationTitle',
      message: 'emailConfirmationMessage',
      status: 'resolved',
    };
  } catch (error: any) {
    let message;
    if (error.code === 'auth/email-already-in-use') {
      message = 'emailAlreadyInUse';
    } else if (error.code === 'auth/network-request-failed') {
      message = 'noInternetConnection';
    } else {
      message = 'somethingWentWrong';
    }
    return {
      title: 'error',
      message,
      status: 'rejected',
    };
  }
};
