import {useTasksState} from '@/entities/task';
import {useUser} from '@/entities/user';
import {FormButton} from '@/shared';
import firestore from '@react-native-firebase/firestore';
import {FC, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert} from 'react-native';

export type TPropTypes = {
  isSynchronized: boolean;
  onSynchronize: () => void;
};

export const CreateBackup: FC<TPropTypes> = ({
  isSynchronized,
  onSynchronize,
}) => {
  const {uid, email} = useUser();
  const {t} = useTranslation();
  const {idCounter, ids, entities} = useTasksState();
  const backupsCollection = firestore().collection('Backups');
  const [loading, setLoading] = useState(false);

  const createBackup = async () => {
    setLoading(true);
    try {
      await backupsCollection.doc(uid).set({
        idCounter,
        ids,
        entities,
        currentEmail: email,
        createdAt: Date.now(),
      });
      const response = await backupsCollection.doc(uid).get();
      if (response) {
        onSynchronize();
        Alert.alert(t('success'), t('backupSaved'));
      }
    } catch (error: any) {
      if (error.code === 'auth/network-request-failed') {
        Alert.alert(t('error'), t('noInternetConnection'));
      } else {
        Alert.alert(t('error'), t('somethingWentWrong'));
      }
    }
    setLoading(false);
  };

  const onPress = () => {
    Alert.alert(t('attention'), t('prevBackupWillBeReplaced'), [
      {
        style: 'destructive',
        onPress: () => {},
        text: t('cancel'),
      },
      {
        style: 'cancel',
        onPress: createBackup,
        text: 'OK',
      },
    ]);
  };

  return (
    <FormButton
      isLoading={loading}
      disabled={isSynchronized}
      type="accent"
      title="createBackup"
      onPress={onPress}
    />
  );
};