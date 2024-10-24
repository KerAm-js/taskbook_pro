import {User} from '@/entities/user';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import * as Keychain from 'react-native-keychain';

export const autoAuth = async (
  auth: FirebaseAuthTypes.Module,
  email: User['email'],
) => {
  if (auth.currentUser?.uid || !email) {
    return;
  }
  const credentials = await Keychain.getGenericPassword();
  if (credentials) {
    await auth.signInWithEmailAndPassword(email, credentials.password);
  }
};
