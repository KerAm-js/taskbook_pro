import {ListRenderItemInfo, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {PADDING_TOP, SCREEN_PADDING} from '@/shared';
import {EmptyListImage} from './EmptyListImage';
import {useSelectedDate, useTaskIds} from '@/entities/task';
import {ListItem} from './ListItem';
import Animated, {LinearTransition} from 'react-native-reanimated';
import {useFocusEffect} from '@react-navigation/native';

const keyExtractor = (item: number) => item.toString();

export const TaskList = () => {
  const taskIds = useTaskIds();
  const selectedDate = useSelectedDate();
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
      maxToRenderPerBatch={isScreenRender.current ? 10 : 1}
      windowSize={11}
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
