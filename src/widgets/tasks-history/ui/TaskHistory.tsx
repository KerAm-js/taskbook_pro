import {ListRenderItemInfo, StyleSheet} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {endOfDay, PADDING_TOP, SCREEN_PADDING} from '@/shared';
import {useTaskIds} from '@/entities/task';
import Animated, {LinearTransition} from 'react-native-reanimated';
import {Section} from './Section';

const renderItem = ({item}: ListRenderItemInfo<number>) => {
  return <Section date={item} />;
};

type Section = {title: string; data: number[]};

const keyExtractor = (item: number) => item.toString();

export const TaskHistory = () => {
  const taskIds = useTaskIds();
  const [data, setData] = useState<number[]>([]);
  const isInitialRender = useRef(true);
  const dates = useRef<number[]>([]);

  // const onEndReached = () => {
  //   setData(curr => [
  //     ...curr,
  //     ...dates.current.slice(curr.length, curr.length + 5),
  //   ]);
  // };

  useEffect(() => {
    isInitialRender.current = false;
  }, []);

  useLayoutEffect(() => {
    const today = endOfDay();
    const datesToSet = [];
    for (let item in taskIds) {
      const date = Number(item);
      if (date >= today) {
        break;
      }
      datesToSet.push(date);
    }
    datesToSet.sort((a, b) => b - a);
    dates.current = datesToSet;
    setData(datesToSet);
  }, []);

  return (
    <Animated.FlatList
      itemLayoutAnimation={
        isInitialRender.current ? undefined : LinearTransition
      }
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      initialNumToRender={3}
      maxToRenderPerBatch={3}
      removeClippedSubviews
      windowSize={11}
      // onEndReached={onEndReached}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: PADDING_TOP,
    paddingBottom: 200,
  },
});
