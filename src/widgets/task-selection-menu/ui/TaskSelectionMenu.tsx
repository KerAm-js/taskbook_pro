import { useIsSelection, useTaskActions } from "@/entities/task";
import { ChangeTasksDate } from "@/features/tasks/change-tasks-date";
import { CopyTasks } from "@/features/tasks/copy-tasks";
import { DeleteTasks } from "@/features/tasks/delete-tasks";
import {
  IconButton,
  ThemedView,
  useSafeAreaPadding,
} from "@/shared";
import { closeSvg } from "@/shared/assets/svg/close";
import { useEffect } from "react";
import { Dimensions, LayoutChangeEvent, StyleSheet } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const HEIGHT = Dimensions.get("screen").height;

const buttonSize = 50;

export const TaskSelectionMenu = () => {
  const { paddingBottom } = useSafeAreaPadding();
  const { endSelection } = useTaskActions();
  const isSelection = useIsSelection();
  const height = useSharedValue(0);
  const translationY = useSharedValue(0);

  const animationConfig = {
    duration: 150,
  };

  const closeMenu = () => {
    translationY.value = withTiming(0, animationConfig);
    endSelection();
  };

  const onLayout = (event: LayoutChangeEvent) => {
    height.value = event.nativeEvent.layout.height;
  };

  const containerStyleAnim = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translationY.value }],
    };
  }, [translationY.value]);

  useEffect(() => {
    if (isSelection) {
      translationY.value = withTiming(-height.value, animationConfig);
    } else {
      closeMenu();
    }
  }, [isSelection]);

  return (
    <ThemedView
      animated
      onLayout={onLayout}
      colorName="background"
      borderColorName="lineGrey"
      style={[styles.container, { paddingBottom: paddingBottom + 10 }, containerStyleAnim]}
      nightStyle={styles.containerNight}
    >
      <DeleteTasks buttonSize={buttonSize} />
      <CopyTasks buttonSize={buttonSize} />
      <ChangeTasksDate buttonSize={buttonSize} />
      <IconButton
        xmlGetter={closeSvg}
        colorName="accent"
        buttonSize={buttonSize}
        onPress={closeMenu}
        disabled={!isSelection}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: HEIGHT,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingHorizontal: 5,
    borderTopWidth: 1,
  },
  containerNight: {
    shadowOpacity: 0,
    borderTopWidth: 1,
  },
});
