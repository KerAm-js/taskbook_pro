import {SetDailyReminder} from '@/features/settings/daily-reminder';
import {Header, PADDING_TOP, SCREEN_PADDING, ThemedView} from '@/shared';
import {ScrollView, StyleSheet} from 'react-native';

export const BeginningOfDay = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <Header modalHeader title="beginningOfDay" />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <SetDailyReminder type="beginning" />
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
