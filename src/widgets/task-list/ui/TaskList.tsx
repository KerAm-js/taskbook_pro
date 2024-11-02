import {ListRenderItemInfo, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {PADDING_TOP, SCREEN_PADDING} from '@/shared';
import {EmptyListImage} from './EmptyListImage';
import {useSelectedDate, useTaskIds} from '@/entities/task';
import {Card} from './Card';
import Animated, {LinearTransition} from 'react-native-reanimated';

const keyExtractor = (item: number) => item.toString();

export const TaskList = () => {
  const taskIds = useTaskIds();
  const selectedDate = useSelectedDate();
  const prevDate = useRef<null | number>(null);
  const isInitialRender = useRef(true);

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

  const renderItem = useCallback(
    ({item, index}: ListRenderItemInfo<number>) => {
      return <Card isInitialRender={isInitialRender} index={index} id={item} />;
    },
    [],
  );

  return (
    <Animated.FlatList
      style={styles.scroll}
      itemLayoutAnimation={
        isInitialRender.current ? undefined : LinearTransition
      }
      maxToRenderPerBatch={1}
      initialNumToRender={12}
      windowSize={11}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      data={taskIds[selectedDate]}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={EmptyListImage}
      onScroll={() => {
        isInitialRender.current = false;
      }}
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
