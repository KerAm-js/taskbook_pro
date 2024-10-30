import {
  ActivityIndicator,
  Dimensions,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import React, {
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  CustomText,
  SCREEN_PADDING,
  TEXT_STYLES,
  ThemedIcon,
  useHeaderHeight,
  useThemeColors,
} from '@/shared';
import {useHistoryTaskIds} from '@/entities/task';
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
import {getHistoryList, TListItem} from '../../lib/getHistoryList';

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
  const historyIds = useHistoryTaskIds();
  const [data, setData] = useState<Array<TListItem>>([]);
  const {colors} = useThemeColors();
  const [filtered, setFiltered] = useState<Array<TListItem>>([]);
  const isInitialRender = useRef(true);
  const headerHeight = useHeaderHeight();
  const {height} = useReanimatedKeyboardAnimation();
  const paddingTop = useSharedValue(0);

  const removeTaskFromList = useCallback((id: number) => {
    const callBack: SetStateAction<TListItem[]> = value => {
      return value.filter((item, index) => {
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
      });
    };
    setFiltered(callBack);
    setData(callBack);
  }, []);

  const renderItem = useCallback(({item}: ListRenderItemInfo<TListItem>) => {
    if (typeof item === 'number') {
      return <Card remove={removeTaskFromList} id={item} />;
    } else if (typeof item === 'string') {
      return <SectionTitle date={Number(item)} />;
    } else {
      return null;
    }
  }, []);

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
      if (historyIds[date]) {
        setFiltered([date.toString(), ...historyIds[date]]);
      }
    } else if (filtered.length > 0) {
      setFiltered([]);
    }
  }, [searchDate]);

  useEffect(() => {
    if (!isSearching && !!filtered.length) {
      setFiltered([]);
    }
  }, [isSearching]);

  useEffect(() => {
    isInitialRender.current = false;
    const dataToSet = getHistoryList(historyIds);
    setData(dataToSet);
  }, []);

  const ListEmptyComponent =
    (isSearching && (
      //enterinig doesn't work with ?/: conditions, i don't know why
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

  return (
    <View>
      <Animated.FlatList
        itemLayoutAnimation={
          isInitialRender.current ? undefined : LinearTransition
        }
        style={{minHeight: HEIGHT - headerHeight}}
        contentContainerStyle={styles.contentContainer}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        windowSize={13}
        ListEmptyComponent={ListEmptyComponent}
      />
      {isSearching && (
        <Animated.FlatList
          itemLayoutAnimation={
            isInitialRender.current ? undefined : LinearTransition
          }
          style={[
            styles.filteredList,
            {
              minHeight: HEIGHT - headerHeight,
              backgroundColor: colors.background,
            },
          ]}
          contentContainerStyle={styles.contentContainer}
          data={filtered}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={ListEmptyComponent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 500,
  },
  filteredList: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
