import {Header, ThemedView} from '@/shared';
import {AccountSettings} from '@/widgets/account-settings';
import {StyleSheet} from 'react-native';

export const Account = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <Header title="reminders" />
      <AccountSettings />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
