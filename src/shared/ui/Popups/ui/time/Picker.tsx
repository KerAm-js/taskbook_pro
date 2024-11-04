import {FC, useCallback} from 'react';
import {
  ListRenderItemInfo,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
} from 'react-native';
import Animated, {useSharedValue} from 'react-native-reanimated';
import {Item, ITEM_HEIGHT, hours, minutes, TItem, TSide} from './Item';

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

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
    const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    if (side === 'left') {
      const item = hours[index];
      onChange(Number(item));
    } else {
      const item = minutes[index];
      onChange(Number(item));
    }
  };

  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      snapToInterval={ITEM_HEIGHT}
      bounces={false}
      contentOffset={{y: initIndex * ITEM_HEIGHT, x: 0}}>
      {data.map((item, index) => (
        <Item
          key={item}
          scrollY={scrollY}
          title={item}
          side={side}
          index={index}
        />
      ))}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 74,
  },
});
