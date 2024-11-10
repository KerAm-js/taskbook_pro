import {SendSupportMessageForm} from '@/features/send-support-message';
import {ThemedView} from '@/shared';
import {StyleSheet} from 'react-native';

export const ProblemMessage = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <SendSupportMessageForm type="problems" />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
