import { ResetPasswordForm } from "@/features/user/reset-password";
import { Header, ThemedView } from "@/shared";
import { StyleSheet } from "react-native";

export const PasswordReset = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <Header title="passwordReset" modalHeader />
      <ResetPasswordForm />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
