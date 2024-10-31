import {ChangeEmailForm} from '@/features/user/change-email/ui/ChangeEmailForm';
import {ThemedView} from '@/shared';
import {StyleSheet} from 'react-native';

export const Email = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <ChangeEmailForm />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
