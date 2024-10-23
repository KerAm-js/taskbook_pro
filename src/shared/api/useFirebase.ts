import {FirebaseContext} from '@/app';
import {useContext} from 'react';

export const useFirebase = () => useContext(FirebaseContext);
