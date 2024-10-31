import {ChangePasswordForm} from '@/features/user/change-password';
import {ThemedView} from '@/shared';
import {StyleSheet} from 'react-native';

export const Password = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <ChangePasswordForm />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
