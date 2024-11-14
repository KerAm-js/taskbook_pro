import {
  useCompletedTasksCount,
  useSelectedDate,
  useTaskIds,
} from '@/entities/task';
import {
  useFirstAppRunDate,
  useIsUserAskedRateApp,
  useUserActions,
} from '@/entities/user';
import {COLORS, SCREEN_PADDING} from '@/shared';
import {useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import ReactNativeInAppReview from 'react-native-in-app-review';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

const askUserRateApp = async () => {
  try {
    await ReactNativeInAppReview.RequestInAppReview();
  } catch (error) {
    console.log(error);
  }
};

const ProgressBar = () => {
  const taskIds = useTaskIds();
  const isUserAskedRateApp = useIsUserAskedRateApp();
  const firstAppRunDate = useFirstAppRunDate();
  const {setUserHasBeenAskedRateApp} = useUserActions();
  const selectedDate = useSelectedDate();
  const completedTasksCount = useCompletedTasksCount();
  const prevCompletedTasksCount = useRef(completedTasksCount);

  const progressStyleAnim = useAnimatedStyle(() => {
    const tasksCount = taskIds[selectedDate].length;
    const progress = tasksCount
      ? Math.round((completedTasksCount / tasksCount) * 100)
      : 0;
    return {
      width: withTiming(`${progress}%`),
    };
  }, [taskIds, selectedDate, completedTasksCount]);

  useEffect(() => {
    if (
      !isUserAskedRateApp &&
      prevCompletedTasksCount.current < completedTasksCount &&
      firstAppRunDate - Date.now() > 259200000
    ) {
      askUserRateApp();
      setUserHasBeenAskedRateApp();
    }
    prevCompletedTasksCount.current = completedTasksCount;
  }, [completedTasksCount]);

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
