import {CustomText, SCREEN_PADDING, TEXT_STYLES} from '@/shared';
import React, {FC, useCallback, useRef, useState} from 'react';
import {
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import {ITEM_WIDTH, Slide} from './Slide';
import {cloudGradientSvg} from '@/shared/assets/svg/cloudGradient';
import {bellGradientSvg} from '@/shared/assets/svg/bellGradient';
import {repeatGradientSvg} from '@/shared/assets/svg/repeatGradient';
import {rocketGradientSvg} from '@/shared/assets/svg/rocketGradient';
import {calendarGradientSvg} from '@/shared/assets/svg/calendarGradient';
import {paletteGradientSvg} from '@/shared/assets/svg/paletteGradient';
import {starGradientSvg} from '@/shared/assets/svg/starGradient';
import Animated, {SharedValue, useSharedValue} from 'react-native-reanimated';

type TSlide = {
  id: number;
  title: string;
  text: string;
  xmlGetter: (colors: string[]) => string;
};

const data: Array<TSlide> = [
  {
    id: 0,
    title: 'backup',
    text: 'backupMessage',
    xmlGetter: cloudGradientSvg,
  },
  {
    id: 2,
    title: 'repeatTask',
    text: 'repeatTaskMessage',
    xmlGetter: repeatGradientSvg,
  },
  {
    id: 3,
    title: 'calendar',
    text: 'calendarMessage',
    xmlGetter: calendarGradientSvg,
  },
  {
    id: 1,
    title: 'notifications',
    text: 'notificationsMessage',
    xmlGetter: bellGradientSvg,
  },
  {
    id: 4,
    title: 'quickAddition',
    text: 'quickAdditionMessage',
    xmlGetter: rocketGradientSvg,
  },
  {
    id: 5,
    title: 'colorScheme',
    text: 'colorSchemeMessage',
    xmlGetter: paletteGradientSvg,
  },
  {
    id: 6,
    title: 'elegantInterface',
    text: 'elegantInterfaceMessage',
    xmlGetter: starGradientSvg,
  },
];

const keyExtractor = (item: TSlide) => item.id.toString();

type TContent = {
  title: string;
  text: string;
};

type TPropTypes = {
  scrollX: SharedValue<number>;
  setContent: (content: TContent) => void;
  index: {current: number};
};

const List: FC<TPropTypes> = React.memo(
  ({scrollX, setContent, index}) => {
    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const {x} = event.nativeEvent.contentOffset;
      scrollX.value = x;
      const currIndex = Math.round(x / ITEM_WIDTH);
      if (currIndex >= 0 && currIndex !== index.current) {
        index.current = currIndex;
        const {text, title} = data[currIndex];
        setContent({text, title});
      }
    };

    const renderItem = ({item, index}: ListRenderItemInfo<TSlide>) => (
      <Slide xmlGetter={item.xmlGetter} index={index} scrollX={scrollX} />
    );

    return (
      <Animated.FlatList
        contentContainerStyle={styles.listContainer}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={4}
        pagingEnabled
        onScroll={onScroll}
        initialNumToRender={2}
        maxToRenderPerBatch={1}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
      />
    );
  },
  () => true,
);

export const Slider = () => {
  const scrollX = useSharedValue(0);
  const index = useRef(0);
  const {text, title} = data[0];
  const [content, setContent] = useState<TContent>({title, text});
  const updateContent = useCallback(
    (newContent: TContent) => setContent(newContent),
    [],
  );

  return (
    <View>
      <List scrollX={scrollX} index={index} setContent={updateContent} />
      <View style={styles.textContainer}>
        <CustomText themed style={styles.title}>
          {content.title}
        </CustomText>
        <CustomText themed style={styles.text}>
          {content.text}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {},
  textContainer: {
    paddingHorizontal: SCREEN_PADDING,
    gap: 10,
    marginBottom: 25,
  },
  title: {
    ...TEXT_STYLES.title,
    textAlign: 'center',
  },
  text: {
    ...TEXT_STYLES.standart,
    minHeight: 63,
    textAlign: 'center',
  },
});
