import {ListRenderItemInfo, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {endOfDay, SCREEN_PADDING} from '@/shared';
import {useTaskIds} from '@/entities/task';
import Animated, {LinearTransition} from 'react-native-reanimated';
import {Card} from './Card';
import {SectionTitle} from './SectionTitle';

const renderItem = ({item}: ListRenderItemInfo<number | string>) => {
  if (typeof item === 'number') {
    return <Card id={item} />;
  } else if (typeof item === 'string') {
    return <SectionTitle date={Number(item)} />;
  } else {
    return null;
  }
};

const keyExtractor = (item: number | string) => item.toString();

export const RecentTasks = () => {
  const taskIds = useTaskIds();
  const [data, setData] = useState<Array<string | number>>([]);
  const isInitialRender = useRef(true);

  // const onEndReached = () => {
  //   setData(curr => [
  //     ...curr,
  //     ...dates.current.slice(curr.length, curr.length + 5),
  //   ]);
  // };

  useEffect(() => {
    console.log(Date.now())
    isInitialRender.current = false;
    const today = endOfDay();
    const dataToSet: Array<number | string> = [];
    let counter = 0
    for (let item in taskIds) {
      counter++;
      const date = Number(item);
      if (date >= today) {
        break;
      }
      if (!!taskIds[date].length) {
        taskIds[date]?.forEach(id => {
          counter++;
          dataToSet.push(id);
        });
        dataToSet.push(item);
      }
    }
    console.log(Date.now(), counter)
    setData(dataToSet.reverse());
  }, [taskIds]);

  return (
    <Animated.FlatList
      itemLayoutAnimation={
        isInitialRender.current ? undefined : LinearTransition
      }
      contentContainerStyle={styles.contentContainer}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      initialNumToRender={1}
      maxToRenderPerBatch={1}
      // onEndReached={onEndReached}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: SCREEN_PADDING,
  },
});
