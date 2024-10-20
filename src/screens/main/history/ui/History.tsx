import {Header, ThemedView} from '@/shared';
import {TaskHistory} from '@/widgets/tasks-history';
import {StyleSheet} from 'react-native';

export const History = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <TaskHistory />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
