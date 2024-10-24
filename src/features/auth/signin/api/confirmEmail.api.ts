import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export const confirmEmail = async (auth: FirebaseAuthTypes.Module) => {
  try {
    await auth.currentUser?.sendEmailVerification();
    return {
      title: 'emailSent',
      message: 'followLinkWeSent',
    };
  } catch (error: any) {
    let message;
    if (error.code === 'auth/network-request-failed') {
      message = 'noInternetConnection';
    } else {
      message = 'somethingWentWrong';
    }
    return {
      title: 'error',
      message,
    };
  }
};
