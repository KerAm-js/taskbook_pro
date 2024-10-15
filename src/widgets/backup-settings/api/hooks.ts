import {Backup} from '@/features/settings/backup';
import {useEffect, useRef, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useUser} from '@/entities/user';
import {useTranslation} from 'react-i18next';
import {Alert} from 'react-native';

export const useStoredBackup = (): [Backup | null, boolean] => {
  const {uid} = useUser();
  const {t} = useTranslation();
  const backupsCollection = firestore().collection('Backups');
  const [storedBackup, setStoredBackup] = useState<Backup | null>(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    const unsubscribe = backupsCollection
      .doc(uid)
      .onSnapshot(
        snapshot => {
          if (isMounted.current) {
            const backup = snapshot.data() as Backup;
            setStoredBackup(backup);
            setLoading(false);
          }
        },
        (error: any) => {
          if (isMounted.current) setLoading(false);
          if (error.code === 'auth/network-request-failed') {
            Alert.alert(t('error'), t('noInternetConnection'));
          } else {
            Alert.alert(t('error'), t('somethingWentWrong'));
          }
        },
      );
    return () => {
      unsubscribe();
      isMounted.current = false;
    };
  }, []);

  return [storedBackup, loading];
};
