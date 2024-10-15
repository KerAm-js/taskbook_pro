import {
  Task,
  useIsSelection,
  useTaskActions,
  useTaskData,
} from "@/entities/task";
import { ThemedView } from "@/shared";
import { FC } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type TPropTypes = Pick<Task, "id"> & { getIsSwiped: () => boolean };

export const SelectionBackdrop: FC<TPropTypes> = ({ id, getIsSwiped }) => {
  const { toggleTaskSelected } = useTaskActions();
  const task = useTaskData(id);
  const { isSelected } = task;
  const isSelection = useIsSelection();

  const onSelect = () => {
    if (getIsSwiped()) return;
    toggleTaskSelected(id);
  };

  if (!isSelection) {
    return null;
  }

  return (
    <Pressable onPress={onSelect} style={styles.selectionPressable}>
      {isSelected && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.selectionBackdrop}
        >
          <ThemedView
            style={styles.selectionBackdrop}
            colorName="accent_opacity"
          />
        </Animated.View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  selectionPressable: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
  },
  selectionBackdrop: {
    flex: 1,
    borderRadius: 10,
    borderCurve: "continuous",
  },
});
