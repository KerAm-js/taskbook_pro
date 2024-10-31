import { ThemedView } from "@/shared";
import { SettingsList } from "@/widgets/settings";
import { StyleSheet } from "react-native";

export const Settings = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <SettingsList />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
