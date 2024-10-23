import {ChangeEmailForm} from '@/features/user/change-email/ui/ChangeEmailForm';
import {Header, ThemedView} from '@/shared';
import {StyleSheet} from 'react-native';

export const Email = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <Header title="emailAddress" />
      <ChangeEmailForm />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
