import { TaskForm } from "@/features/tasks/add-task";
import {
  ThemedView,
} from "@/shared";
import { StyleSheet } from "react-native";

export const Task = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <TaskForm />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
