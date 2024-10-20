import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {FC, PropsWithChildren, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {arrowLeftSvg} from '@/shared/assets/svg/arrowLeft';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {
  COLORS,
  CustomText,
  HEADER_CONTENT_HEIGHT,
  HEADER_SHADOW,
  SCREEN_PADDING,
  TEXT_STYLES,
  ThemedView,
  useSafeAreaPadding,
} from '@/shared';
import {SearchBar} from './SearchBar';

export const Header: FC<PropsWithChildren> = ({children}) => {
  const [isSearching, setIsSearching] = useState(false);
  const {paddingTop} = useSafeAreaPadding();

  const navigation = useNavigation();

  const goBack = () => navigation.goBack();

  const titleContainerStyleAnim = useAnimatedStyle(() => {
    return {
      opacity: withDelay(
        isSearching ? 0 : 150,
        withTiming(isSearching ? 0 : 1, {duration: 100}),
      ),
    };
  }, [isSearching]);

  return (
    <ThemedView
      colorName="accent"
      nightColorName="backgroundSecond"
      style={[
        styles.container,
        {
          paddingTop,
        },
      ]}>
      <Animated.View style={[styles.titleContainer, titleContainerStyleAnim]}>
        <Pressable onPress={goBack} style={styles.left}>
          <SvgXml xml={arrowLeftSvg(COLORS.white)} width={18} height={18} />
        </Pressable>
        <CustomText style={styles.title}>recentlyCompleted</CustomText>
        <View style={styles.left} />
      </Animated.View>
      <SearchBar isSearching={isSearching} setIsSearching={setIsSearching} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...HEADER_SHADOW,
    paddingBottom: 12,
  },
  titleContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  left: {
    justifyContent: 'center',
    paddingHorizontal: SCREEN_PADDING,
    height: HEADER_CONTENT_HEIGHT,
    width: 80,
  },
  title: {
    ...TEXT_STYLES.standartSemibold,
    letterSpacing: 0.5,
    color: COLORS.white,
  },
  right: {
    justifyContent: 'center',
    paddingHorizontal: SCREEN_PADDING,
    height: HEADER_CONTENT_HEIGHT,
    width: 80,
    alignItems: 'flex-end',
  },
});
