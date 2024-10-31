import {ChangeNameForm} from '@/features/user/change-name';
import {ThemedView} from '@/shared';
import {StyleSheet} from 'react-native';

export const Name = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <ChangeNameForm />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
