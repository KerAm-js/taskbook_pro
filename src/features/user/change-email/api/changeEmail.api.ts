import {
  checkCanUpdate,
  getNewUpdatedAt,
  User,
  UserUpdates,
} from '@/entities/user';
import {TApiMessage} from '@/entities/user/model/types';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

type TParams = {
  auth: FirebaseAuthTypes.Module;
  user: User;
  email: string;
  password: string;
  usersCollection: FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>;
};

export const changeEmail = async ({
  auth,
  user,
  password,
  email,
  usersCollection,
}: TParams): Promise<TApiMessage> => {
  try {
    if (!user.email) throw new Error();
    const authorization = await auth.signInWithEmailAndPassword(
      user.email,
      password,
    );
    const response = await usersCollection.doc(authorization.user.uid).get();
    const userInfo = response.data() as UserUpdates;
    const canUpdate = checkCanUpdate(userInfo.emailUpdatedAt);
    if (canUpdate) {
      await authorization.user.updateEmail(email);
      const emailUpdatedAt: UserUpdates['emailUpdatedAt'] = getNewUpdatedAt(
        userInfo.emailUpdatedAt,
      );
      usersCollection
        .doc(authorization.user.uid)
        .set({...userInfo, emailUpdatedAt});
      return {
        title: 'success',
        message: 'emailAddressSuccessfullyChanged',
        status: 'resolved',
      };
    } else {
      return {
        title: 'error',
        message: 'youHaveAlreadyChangedEmail',
        status: 'rejected',
      };
    }
  } catch (error: any) {
    let message;
    if (error.code === 'auth/wrong-password') {
      message = 'wrongPassword';
    } else if (error.code === 'auth/email-already-in-use') {
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
