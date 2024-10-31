import { SignupForm } from "@/features/auth/signup";
import { ThemedView } from "@/shared";
import { StyleSheet } from "react-native";

export const Signup = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <SignupForm />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
