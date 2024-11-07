import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {checkCanUpdate, getNewUpdatedAt} from '../lib/checkCanUpdate';
import {User, TApiMessage, UserUpdates} from '../model/types';

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
