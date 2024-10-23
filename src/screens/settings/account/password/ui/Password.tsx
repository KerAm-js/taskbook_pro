import {ChangePasswordForm} from '@/features/user/change-password';
import {Header, ThemedView} from '@/shared';
import {StyleSheet} from 'react-native';

export const Password = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <Header title="password" />
      <ChangePasswordForm />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
