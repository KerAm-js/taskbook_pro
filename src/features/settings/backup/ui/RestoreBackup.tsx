import {useTaskActions} from '@/entities/task';
import {FormButton, TEXT_STYLES} from '@/shared';
import {FC, useState} from 'react';
import {Backup} from '../model/types';
import {useTranslation} from 'react-i18next';
import {Alert, StyleSheet} from 'react-native';
import {TPropTypes} from './CreateBackup';

export const RestoreBackup: FC<Backup & TPropTypes> = ({
  idCounter,
  ids,
  entities,
  historyIds,
  isSynchronized,
  onSynchronize,
}) => {
  const {setDataFromBackup} = useTaskActions();
  const [title, setTitle] = useState('restore');
  const {t} = useTranslation();

  const onPress = () => {
    Alert.alert(t('attention'), t('currentDataWillBeReplaced'), [
      {
        style: 'destructive',
        onPress: () => {},
        text: t('cancel'),
      },
      {
        style: 'cancel',
        onPress: () => {
          setTitle('copyIsRestored');
          onSynchronize();
          setDataFromBackup({idCounter, ids, entities, historyIds});
        },
        text: 'OK',
      },
    ]);
  };

  return (
    <FormButton
      type="secondary"
      disabled={isSynchronized}
      title={title}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    ...TEXT_STYLES.standartSemibold,
    textAlign: 'center',
  },
});
