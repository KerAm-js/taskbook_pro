import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import ProgressBar from './components/ProgressBar';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import NavBar from './components/NavBar';
import {
  HEADER_SHADOW,
  ThemedGradient,
  ThemedView,
  useSafeAreaPadding,
} from '@/shared';
import Calendar from './components/Calendar';
import {MAX_H, MIN_H} from '../config/headerHeight';
import {Title} from './components/Title';
import {KeyboardBackdrop} from '@/features/keyboard-backdrop';

export const MainHeader = () => {
  const [isCalendarOpened, setCalendarOpened] = useState<boolean>(false);
  const {paddingTop} = useSafeAreaPadding();

  const TRANSLATE = MAX_H - MIN_H;

  const calendarTranslate = useSharedValue(isCalendarOpened ? 0 : -TRANSLATE);

  const toggleCalendarOpened = () => {
    setCalendarOpened(!isCalendarOpened);
    ReactNativeHapticFeedback.trigger('soft', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
    calendarTranslate.value = withSpring(!isCalendarOpened ? 0 : -TRANSLATE, {
      duration: 1100,
      dampingRatio: 0.48,
    });
  };

  const calendarStyleAnim = useAnimatedStyle(() => {
    return {
      zIndex: -1,
      transform: [{translateY: calendarTranslate.value}],
      display: calendarTranslate.value === -TRANSLATE ? 'none' : 'flex',
      opacity: withTiming(isCalendarOpened ? 1 : 0, {
        duration: isCalendarOpened ? 150 : 80,
      }),
    };
  }, [isCalendarOpened]);

  const contentStyleAnim = useAnimatedStyle(() => {
    return {
      height: withSpring(isCalendarOpened ? MAX_H : MIN_H, {
        duration: 1100,
        dampingRatio: 0.48,
      }),
    };
  }, [isCalendarOpened]);

  const titleStyleAnim = useAnimatedStyle(() => {
    return {
      opacity: isCalendarOpened
        ? withTiming(0, {duration: 80})
        : withTiming(1, {duration: 80}),
      position: 'absolute',
      bottom: 10,
      zIndex: -2,
    };
  });

  return (
    <ThemedView colorName="background" style={[styles.container, {paddingTop}]}>
      <ThemedGradient />
      <Animated.View style={[contentStyleAnim]}>
        <NavBar
          isCalendarOpened={isCalendarOpened}
          toggleCalendarOpened={toggleCalendarOpened}
        />
        <Title isCalendarOpened={isCalendarOpened} />
        <Animated.View style={calendarStyleAnim}>
          <Calendar />
        </Animated.View>
      </Animated.View>
      <ProgressBar />
      <KeyboardBackdrop />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...HEADER_SHADOW,
    zIndex: 1,
  },
});
