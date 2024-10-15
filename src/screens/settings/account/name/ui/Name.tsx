import {ChangeNameForm} from '@/features/user/change-name';
import {Header, ThemedView} from '@/shared';
import {StyleSheet} from 'react-native';

export const Name = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <Header title="fullName" modalHeader />
      <ChangeNameForm />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
