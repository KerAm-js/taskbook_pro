import {ThemedView} from '@/shared';
import {ReminderSettings} from '@/widgets/reminder-settings';
import {StyleSheet} from 'react-native';

export const Reminders = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <ReminderSettings />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
