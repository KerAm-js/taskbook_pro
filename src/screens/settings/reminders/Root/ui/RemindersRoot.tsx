import {Header, ThemedView} from '@/shared';
import {ReminderSettings} from '@/widgets/reminder-settings';
import {StyleSheet} from 'react-native';

export const RemindersRoot = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <Header title="reminders" />
      <ReminderSettings />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
