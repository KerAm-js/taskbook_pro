import {
  checkCanUpdate,
  getNewUpdatedAt,
  TApiMessage,
  User,
  UserUpdates,
} from '@/entities/user';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

type TParams = {
  auth: FirebaseAuthTypes.Module;
  user: User;
  usersCollection: FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>;
  currentPassword: string;
  newPassword: string;
};

export const changePassword = async ({
  auth,
  user,
  usersCollection,
  currentPassword,
  newPassword,
}: TParams): Promise<TApiMessage> => {
  try {
    if (!user.email) throw new Error();
    const authorization = await auth.signInWithEmailAndPassword(
      user.email,
      currentPassword,
    );
    const response = await usersCollection.doc(authorization.user.uid).get();
    const userInfo = response.data() as UserUpdates;
    const canUpdate = checkCanUpdate(userInfo.passwordUpdatedAt);
    if (newPassword === currentPassword) {
      return {
        title: 'passwordAlreadyInUse',
        message: '',
        status: 'rejected',
      };
    }
    if (canUpdate) {
      await authorization.user.updatePassword(newPassword);
      const passwordUpdatedAt: UserUpdates['emailUpdatedAt'] = getNewUpdatedAt(
        userInfo.passwordUpdatedAt,
      );
      await usersCollection
        .doc(authorization.user.uid)
        .set({...userInfo, passwordUpdatedAt});
      return {
        title: 'success',
        message: 'passwordSuccessfullyChanged',
        status: 'resolved',
      };
    } else {
      return {
        title: 'error',
        message: 'youHaveAlreadyChangedPassword',
      };
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
    return {
      title: 'error',
      status: 'rejected',
      message,
    };
  }
};
