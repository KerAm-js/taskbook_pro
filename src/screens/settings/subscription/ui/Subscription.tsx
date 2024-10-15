import {Header, ThemedView} from '@/shared';
import {SubscriptionInfo} from '@/widgets/subscribtion';
import {StyleSheet} from 'react-native';

export const Subscription = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <Header title="taskbookForever" modalHeader />
      <SubscriptionInfo />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
