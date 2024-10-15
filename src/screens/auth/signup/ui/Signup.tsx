import { SignupForm } from "@/features/auth/signup";
import { Header, ThemedView } from "@/shared";
import { StyleSheet } from "react-native";

export const Signup = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <Header title="registration" />
      <SignupForm />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
