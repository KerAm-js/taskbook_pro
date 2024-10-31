import { SigninForm } from "@/features/auth/signin";
import { ThemedView } from "@/shared";
import { StyleSheet } from "react-native";

export const Signin = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <SigninForm />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
