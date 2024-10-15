import {Header, ThemedView} from '@/shared';
import {BackupSettings} from '@/widgets/backup-settings';
import {StyleSheet} from 'react-native';

export const Backup = () => {
  return (
    <ThemedView style={styles.container} colorName="background">
      <Header title="backupCopy" />
      <BackupSettings />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
