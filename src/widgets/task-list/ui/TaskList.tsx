import {ListRenderItemInfo, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {PADDING_TOP, SCREEN_PADDING} from '@/shared';
import {EmptyListImage} from './EmptyListImage';
import {
  useCompletedTasksCount,
  useSelectedDate,
  useTaskIds,
} from '@/entities/task';
import {
  deleteDailyNotification,
  updateDailyNotification,
  useDailyReminder,
} from '@/entities/settings';
import {useTranslation} from 'react-i18next';
import {ListItem} from './ListItem';
import Animated, {LinearTransition} from 'react-native-reanimated';

const keyExtractor = (item: number) => item.toString();

export const TaskList = () => {
  const taskIds = useTaskIds();
  const completedTasksCount = useCompletedTasksCount();
  const selectedDate = useSelectedDate();
  const {end, beginning} = useDailyReminder();
  const {t} = useTranslation();
  const prevDate = useRef<null | number>(null);
  const isInitialRender = useRef(true);
  const isScreenRender = useRef(true);

  useMemo(() => {
    if (!prevDate.current) {
      prevDate.current = selectedDate;
      return;
    }
    if (prevDate.current !== selectedDate) {
      prevDate.current = selectedDate;
      isInitialRender.current = true;
    } else {
      isInitialRender.current = false;
    }
  }, [taskIds, selectedDate]);

  useEffect(() => {
    isScreenRender.current = false;
  }, []);

  useEffect(() => {
    for (let item in taskIds) {
      const date = Number(item);
      if (!end.turnedOff || !taskIds[date]?.length) {
        deleteDailyNotification(date, 'end');
      } else {
        updateDailyNotification({
          type: 'end',
          title: t('reviewOfTheDay'),
          body: t('tasksCompleted', {
            count: taskIds[date].length,
            completed: completedTasksCount,
          }),
          date: Number(date),
          ...end,
        });
      }
    }
  }, [end]);

  useEffect(() => {
    for (let item in taskIds) {
      const date = Number(item);
      if (!beginning.turnedOff || !taskIds[date]?.length) {
        deleteDailyNotification(date, 'beginning');
      } else {
        updateDailyNotification({
          type: 'beginning',
          title: t('plansForToday'),
          body: t('tasksToDo', {count: taskIds[date].length}),
          date,
          ...beginning,
        });
      }
    }
  }, [beginning]);

  useEffect(() => {
    const length = taskIds[selectedDate]?.length;
    if (beginning.turnedOff || !length) {
      deleteDailyNotification(selectedDate, 'beginning');
    } else {
      updateDailyNotification({
        type: 'beginning',
        title: t('plansForToday'),
        body: t('tasksToDo', {count: taskIds[selectedDate].length}),
        date: selectedDate,
        ...beginning,
      });
    }
    if (end.turnedOff || !length) {
      deleteDailyNotification(selectedDate, 'end');
    } else {
      updateDailyNotification({
        type: 'end',
        title: t('reviewOfTheDay'),
        body: t('tasksCompleted', {
          count: taskIds[selectedDate].length,
          completed: completedTasksCount,
        }),
        date: selectedDate,
        ...end,
      });
    }
  }, [taskIds[selectedDate].length]);

  useEffect(() => {
    if (!end.turnedOff && !!taskIds[selectedDate]?.length) {
      updateDailyNotification({
        type: 'end',
        title: t('reviewOfTheDay'),
        body: t('tasksCompleted', {
          count: taskIds[selectedDate].length,
          completed: completedTasksCount,
        }),
        date: selectedDate,
        ...end,
      });
    }
  }, [completedTasksCount]);

  const renderItem = useCallback(
    ({item, index}: ListRenderItemInfo<number>) => {
      return (
        <ListItem isInitialRender={isInitialRender} index={index} id={item} />
      );
    },
    [],
  );

  return (
    <Animated.FlatList
      style={styles.scroll}
      itemLayoutAnimation={
        isInitialRender.current ? undefined : LinearTransition
      }
      initialNumToRender={10}
      maxToRenderPerBatch={isScreenRender.current ? 10 : 1}
      windowSize={15}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      data={taskIds[selectedDate]}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={EmptyListImage}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: PADDING_TOP,
    paddingBottom: 200,
    paddingHorizontal: SCREEN_PADDING,
  },
  scroll: {
    flex: 1,
  },
});
