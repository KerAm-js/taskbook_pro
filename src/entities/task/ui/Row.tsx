import React, { FC, useEffect } from "react";
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Task } from "../model/types";
import { TaskInfo } from "./Info";
import { bellOutlineSvg } from "@/shared/assets/svg/bellOutline";
import { repeatSvg } from "@/shared/assets/svg/repeat";
import { noteSvg } from "@/shared/assets/svg/note";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { TaskTitle } from "./Title";
import { useTaskData } from "../model/hooks";

type TPropTypes = {
  id: Task["id"];
  onPress?: (event: GestureResponderEvent) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  blackWhenCompleted?: boolean;
};

export const TaskRow: FC<TPropTypes> = ({
  id,
  onPress,
  onLayout,
  blackWhenCompleted,
}) => {
  const task = useTaskData(id);
  const { remindTime, isRegular, isCompleted, note, isTitleEditing, title } = task;

  const translateX = useSharedValue(isTitleEditing && !title ? -28 : 0);
  const opacity = useSharedValue(isCompleted ? 0.4 : 1);

  const containerStyleAnim = useAnimatedStyle(() => {
    return {
      opacity: blackWhenCompleted ? 1 : opacity.value,
      transform: [{ translateX: translateX.value }],
    };
  }, [isCompleted]);

  useEffect(() => {
    translateX.value = withTiming(isTitleEditing && !title ? -28 : 0);
  }, [isTitleEditing]);

  useEffect(() => {
    const easing = Easing.out(Easing.quad);
    if (isCompleted && opacity.value === 1) {
      translateX.value = withSequence(
        withTiming(7, { duration: 200, easing }),
        withTiming(0, { duration: 200, easing })
      );
    }
    opacity.value = withDelay(
      isCompleted ? 700 : 0,
      withTiming(isCompleted ? 0.4 : 1)
    );
  }, [isCompleted]);

  return (
    <Animated.View
      onLayout={onLayout}
      style={[styles.container, containerStyleAnim]}
    >
      <TaskTitle task={task} />
      <View style={styles.infoContainer}>
        {remindTime && (
          <TaskInfo xmlGetter={bellOutlineSvg} title={remindTime} />
        )}
        {isRegular && (
          <TaskInfo
            translateTitle
            xmlGetter={repeatSvg}
            title={task.repeatingType}
          />
        )}
        {note && <TaskInfo translateTitle xmlGetter={noteSvg} title="note" />}
      </View>
      {!isTitleEditing && <Pressable onPress={onPress} style={styles.pressable} />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 8,
    paddingTop: 11,
  },
  pressable: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  containerNight: {
    shadowOpacity: 0,
  },
  infoContainer: {
    flexDirection: "row",
    gap: 5,
    flexWrap: "wrap",
    maxWidth: "100%",
  },
});
