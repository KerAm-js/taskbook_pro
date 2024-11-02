import {
  useCompletedTasksCount,
  useSelectedDate,
  useTaskIds,
} from "@/entities/task";
import { COLORS, SCREEN_PADDING } from "@/shared";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const ProgressBar = () => {
  const taskIds = useTaskIds();
  const selectedDate = useSelectedDate();
  const completedTasksCount = useCompletedTasksCount();

  const progressStyleAnim = useAnimatedStyle(() => {
    const tasksCount = taskIds[selectedDate].length;
    const progress = tasksCount
      ? Math.round((completedTasksCount / tasksCount) * 100)
      : 0;
    return {
      width: withTiming(`${progress}%`),
    };
  }, [taskIds, selectedDate, completedTasksCount]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progress, progressStyleAnim]} />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.whiteOpacity,
    marginBottom: 15,
    marginHorizontal: SCREEN_PADDING,
  },
  progress: {
    height: 4,
    backgroundColor: COLORS.white,
    borderRadius: 2,
    shadowColor: COLORS.white,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.8,
  },
});
