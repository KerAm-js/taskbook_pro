import { SendSupportMessageForm } from '@/features/send-support-message';
import {ThemedView} from '@/shared';
import {StyleSheet} from 'react-native';

export const IdeaMessage = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <SendSupportMessageForm type="ideas"  />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
