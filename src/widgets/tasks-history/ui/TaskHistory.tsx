import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { endOfDay, PADDING_TOP, SCREEN_PADDING } from "@/shared";
import { useTaskIds } from "@/entities/task";
import { Section } from "./Section";

const renderItem = ({ item }: ListRenderItemInfo<number>) => {
  return <Section date={item} />;
};

const keyExtractor = (item: number) => item.toString();

export const TaskHistory = () => {
  const taskIds = useTaskIds();

  const dates = useMemo(() => {
    const result: number[] = [];
    for (let date in taskIds) {
      if (Number(date) < endOfDay()) {
        result.push(Number(date));
      }
    }
    result.sort((a, b) => b - a);
    return result;
  }, []);

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      data={dates}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      initialNumToRender={1}
      maxToRenderPerBatch={1}
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
