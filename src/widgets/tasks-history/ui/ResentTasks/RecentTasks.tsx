import {
  ActivityIndicator,
  Dimensions,
  ListRenderItemInfo,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
  CustomText,
  endOfDay,
  SCREEN_PADDING,
  TEXT_STYLES,
  ThemedIcon,
  useHeaderHeight,
} from '@/shared';
import {useTaskIds} from '@/entities/task';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Card} from './Card';
import {SectionTitle} from './SectionTitle';
import {searchSvg} from '@/shared/assets/svg/search';
import {useReanimatedKeyboardAnimation} from 'react-native-keyboard-controller';
import {getDateFromString} from '../../lib/getDateFromString';

const keyExtractor = (item: number | string) => item.toString();

const HEIGHT = Dimensions.get('screen').height;
const ICON_SIZE = 80;

const animationConfig = {
  duration: 350,
};

type TPropTypes = {
  searchDate: string;
  isSearching: boolean;
};

export const RecentTasks: FC<TPropTypes> = ({searchDate, isSearching}) => {
  const taskIds = useTaskIds();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Array<string | number>>([]);
  const [filtered, setFiltered] = useState<Array<string | number>>([]);
  const isInitialRender = useRef(true);
  const headerHeight = useHeaderHeight();
  const {height} = useReanimatedKeyboardAnimation();
  const paddingTop = useSharedValue(0);

  const removeTaskFromList = useCallback((id: number) => {
    setData(value =>
      value.filter((item, index) => {
        if (
          typeof item === 'string' &&
          value[index + 1] === id &&
          typeof value[index + 2] === 'string'
        ) {
          return false;
        } else if (typeof item === 'number' && item === id) {
          return false;
        } else {
          return true;
        }
      }),
    );
  }, []);

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<number | string>) => {
      if (typeof item === 'number') {
        return <Card remove={removeTaskFromList} id={item} />;
      } else if (typeof item === 'string') {
        return <SectionTitle date={Number(item)} />;
      } else {
        return null;
      }
    },
    [],
  );

  const iconStyleAnim = useAnimatedStyle(() => {
    return {
      paddingTop: paddingTop.value,
    };
  }, [paddingTop.value]);

  useAnimatedReaction(
    () => height.value,
    curr => {
      if (curr !== 0) {
        paddingTop.value = withTiming(
          (HEIGHT - headerHeight - -height.value) / 2 - ICON_SIZE / 2 - 20,
          animationConfig,
        );
      } else {
        paddingTop.value = withTiming(
          HEIGHT / 2 - headerHeight - ICON_SIZE / 2 - 20,
          animationConfig,
        );
      }
    },
  );

  useEffect(() => {
    if (searchDate.length === 10) {
      const date = getDateFromString(searchDate);
      if (taskIds[date]) {
        const ids = [...taskIds[date]].reverse();
        setFiltered([date.toString(), ...ids]);
      }
      console.log(date, taskIds[date]);
    } else {
      setFiltered([]);
    }
  }, [searchDate]);

  useEffect(() => {
    if (!isSearching) {
      setFiltered([]);
    }
  }, [isSearching]);

  useEffect(() => {
    isInitialRender.current = false;
    const timeout = setTimeout(() => {
      const today = endOfDay();
      const dataToSet: Array<number | string> = [];
      for (let item in taskIds) {
        const date = Number(item);
        if (date >= today) {
          break;
        }
        if (!!taskIds[date].length) {
          taskIds[date]?.forEach(id => {
            dataToSet.push(id);
          });
          dataToSet.push(item);
        }
      }
      setData(dataToSet.reverse());
      setLoading(false);
    }, 0);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const ListEmptyComponent =
    (isSearching && (
      //enterinig doesn't work with ?-: conditions, i don't know why
      <Animated.View
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(150)}>
        <Animated.View style={iconStyleAnim}>
          <ThemedIcon
            colorName="lineGrey"
            xmlGetter={searchSvg}
            style={styles.icon}
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
        </Animated.View>
      </Animated.View>
    )) ||
    (!isSearching && (
      <Animated.View
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(150)}>
        <CustomText
          themed
          colorName="textGrey"
          style={[
            styles.emptyListTitle,
            {paddingTop: HEIGHT / 2 - headerHeight - 62},
          ]}>
          completedTasksStoredHere
        </CustomText>
      </Animated.View>
    )) ||
    null;

  if (loading) {
    return <ActivityIndicator />;
  }

  if ((isSearching && filtered.length === 0) || data.length === 0) {
    return (
      <ScrollView style={{minHeight: HEIGHT - headerHeight}}>
        {isSearching && (
          //enterinig doesn't work with ?-: conditions, i don't know why
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(150)}>
            <Animated.View style={iconStyleAnim}>
              <ThemedIcon
                colorName="lineGrey"
                xmlGetter={searchSvg}
                style={styles.icon}
                width={ICON_SIZE}
                height={ICON_SIZE}
              />
            </Animated.View>
          </Animated.View>
        )}
        {!isSearching && (
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(150)}>
            <CustomText
              themed
              colorName="textGrey"
              style={[
                styles.emptyListTitle,
                {paddingTop: HEIGHT / 2 - headerHeight - 62},
              ]}>
              completedTasksStoredHere
            </CustomText>
          </Animated.View>
        )}
      </ScrollView>
    );
  }

  return (
    <Animated.FlatList
      itemLayoutAnimation={
        isInitialRender.current ? undefined : LinearTransition
      }
      style={{minHeight: HEIGHT - headerHeight}}
      contentContainerStyle={styles.contentContainer}
      data={isSearching ? filtered : data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      maxToRenderPerBatch={1}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: SCREEN_PADDING,
  },
  emptyListIconContainer: {
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 'auto',
  },
  emptyListTitle: {
    textAlign: 'center',
    ...TEXT_STYLES.standart,
  },
});
