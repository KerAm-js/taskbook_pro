import {SetReminderInterval} from '@/features/settings/reminder-interval';
import {PADDING_TOP, SCREEN_PADDING, ThemedView} from '@/shared';
import {ScrollView, StyleSheet} from 'react-native';

export const Interval = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <SetReminderInterval />
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    paddingTop: PADDING_TOP,
    paddingHorizontal: SCREEN_PADDING,
  },
  contentContainer: {
    paddingBottom: 200,
  },
});
