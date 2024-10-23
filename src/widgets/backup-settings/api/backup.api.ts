import {Backup} from '@/features/settings/backup';
import {useEffect, useRef, useState} from 'react';
import {useUser} from '@/entities/user';
import {useTranslation} from 'react-i18next';
import {Alert} from 'react-native';
import {autoAuth, useFirebase} from '@/shared';

export const useStoredBackup = (): [Backup | null, boolean] => {
  const {uid, email} = useUser();
  const {t} = useTranslation();
  const {auth, firestore} = useFirebase();
  const backupsCollection = firestore.collection('Backups');
  const [storedBackup, setStoredBackup] = useState<Backup | null>(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    let unsubscribe: () => void;
    autoAuth(auth, email)
      .then(() => {
        if (!isMounted.current) {
          return;
        }
        unsubscribe = backupsCollection.doc(uid).onSnapshot(
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
              console.log(error);
            }
          },
        );
      })
      .catch(error => {
        if (error.code === 'auth/network-request-failed') {
          Alert.alert(t('error'), t('noInternetConnection'));
        }
      });

    return () => {
      if (unsubscribe) unsubscribe();
      isMounted.current = false;
    };
  }, [auth.currentUser]);

  return [storedBackup, loading];
};
