import {
  checkCanUpdate,
  getNewUpdatedAt,
  TUserUpdates,
  User,
} from '@/entities/user';
import {TApiMessage} from '@/entities/user/model/types';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

type TPasswordResets = {
  passwordResettedAt: TUserUpdates;
};

type TParams = {
  auth: FirebaseAuthTypes.Module;
  email: string;
  passwordResetsCollection: FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>;
};

export const sendPasswordResetEmail = async ({
  auth,
  email,
  passwordResetsCollection,
}: TParams): Promise<TApiMessage> => {
  try {
    const response = await passwordResetsCollection.doc(email).get();
    const lastPasswordResets = response.data() as TPasswordResets;
    const canUpdate = checkCanUpdate(lastPasswordResets?.passwordResettedAt);
    if (canUpdate) {
      await auth.sendPasswordResetEmail(email);
      const passwordResettedAt: TUserUpdates = getNewUpdatedAt(
        lastPasswordResets?.passwordResettedAt,
      );
      await passwordResetsCollection.doc(email).set({passwordResettedAt});

      return {
        title: 'emailSent',
        message: 'followLinkWeSent',
        status: 'resolved',
      };
    } else {
      return {
        title: 'error',
        message: 'passwordResetEmailHasAlreadyBeenSent',
        status: 'rejected',
      };
    }
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
