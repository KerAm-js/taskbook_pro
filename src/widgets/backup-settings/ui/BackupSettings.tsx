import {SetAutoSync} from '@/features/settings/auto-sync';
import {PADDING_TOP, SCREEN_PADDING} from '@/shared';
import {ScrollView, StyleSheet, View} from 'react-native';
import {BackupInfo} from './BackupInfo';
import {CreateBackup, RestoreBackup} from '@/features/settings/backup';
import React, { useState } from 'react';
import {useStoredBackup} from '../api/backup.api';

export const BackupSettings = () => {
  const [storedBackup, loading] = useStoredBackup();
  const [isSynchronized, setIsSynchronized] = useState(false);

  const onSynchronize = () => {
    setIsSynchronized(true);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <SetAutoSync />
      <View style={styles.backupActions}>
        <BackupInfo date={storedBackup?.createdAt} loading={loading} />
        {storedBackup?.createdAt && !loading && (
          <RestoreBackup isSynchronized={isSynchronized} onSynchronize={onSynchronize} {...storedBackup} />
        )}
        <CreateBackup isSynchronized={isSynchronized} onSynchronize={onSynchronize} />
      </View>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: PADDING_TOP,
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 200,
  },
  backupActions: {
    gap: 10,
  },
});
