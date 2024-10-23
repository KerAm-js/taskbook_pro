import {createContext} from 'react';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const firebaseContextDefaultValue = {firestore: firestore(), auth: auth()};

export const FirebaseContext = createContext<{
  firestore: FirebaseFirestoreTypes.Module;
  auth: FirebaseAuthTypes.Module;
}>(firebaseContextDefaultValue);
