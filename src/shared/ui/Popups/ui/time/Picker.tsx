import { FC, useCallback } from "react";
import {
  ListRenderItemInfo,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
} from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import { Item, ITEM_HEIGHT, hours, minutes, TItem, TSide } from "./Item";

type TPickerPropTypes = {
  data: Array<TItem>;
  side: TSide;
  onChange: (value: number) => void;
  initIndex: number;
};

export const Picker: FC<TPickerPropTypes> = ({
  data,
  side,
  onChange,
  initIndex,
}) => {
  const scrollY = useSharedValue(0);

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<TItem>) => (
      <Item scrollY={scrollY} title={item} side={side} index={index} />
    ),
    []
  );

  const keyExtractor = useCallback((item: TItem) => item, []);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) =>
      (scrollY.value = event.nativeEvent.contentOffset.y),
    []
  );

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (side === "left") {
      const item =
        hours[Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT)];
      onChange(Number(item));
    } else {
      const item =
        minutes[Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT)];
      onChange(Number(item));
    }
  };

  return (
    <Animated.FlatList
      scrollEventThrottle={16}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      onMomentumScrollEnd={onScrollEnd}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      snapToInterval={ITEM_HEIGHT}
      bounces={false}
      initialScrollIndex={initIndex}
      getItemLayout={(_, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
    />
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 74,
  },
});
