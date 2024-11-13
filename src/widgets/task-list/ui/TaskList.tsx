import {ListRenderItemInfo, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import {PADDING_TOP, SCREEN_PADDING} from '@/shared';
import {EmptyListImage} from './EmptyListImage';
import {useSelectedDate, useTaskIdsForDate} from '@/entities/task';
import {Card} from './Card';
import Animated, {LinearTransition} from 'react-native-reanimated';
import {useIsInitialTaskListRender} from '../lib/useFifteenTasksAddedForOneDayLogger';
import {useFifteenTasksAddedForOneDayLogger} from '../lib/useIsAddedMoreThanTwentyTasks';

const keyExtractor = (item: number) => item.toString();

export const TaskList = () => {
  const selectedDate = useSelectedDate();
  const taskIds = useTaskIdsForDate(selectedDate);
  const isFirstAppRender = useRef(true);
  const isInitialRender = useIsInitialTaskListRender(selectedDate);

  const renderItem = useCallback(
    ({item, index}: ListRenderItemInfo<number>) => {
      return <Card isInitialRender={isInitialRender} index={index} id={item} />;
    },
    [],
  );

  useEffect(() => {
    if (isFirstAppRender.current) isFirstAppRender.current = false;
  }, []);

  useFifteenTasksAddedForOneDayLogger(
    isInitialRender.current || isFirstAppRender.current,
    selectedDate,
    taskIds,
  );

  return (
    <Animated.FlatList
      style={styles.scroll}
      itemLayoutAnimation={
        isFirstAppRender.current || isInitialRender.current
          ? undefined
          : LinearTransition
      }
      maxToRenderPerBatch={1}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      data={taskIds}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={EmptyListImage}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: PADDING_TOP,
    paddingBottom: 100,
    paddingHorizontal: SCREEN_PADDING,
  },
  scroll: {
    flex: 1,
  },
});
