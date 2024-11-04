import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import ProgressBar from './ProgressBar';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import NavBar from './NavBar';
import {
  HEADER_SHADOW,
  ThemedGradient,
  ThemedView,
  useSafeAreaPadding,
} from '@/shared';
import Calendar from './Calendar/Calendar';
import {MAX_H, MIN_H} from '../config/headerHeight';
import {Title} from './Calendar/Title';
import {KeyboardBackdrop} from '@/features/keyboard-backdrop';

const springAnimationConfig = {
  damping: 18,
  stiffness: 330,
  mass: 1,
};

const TRANSLATE = MAX_H - MIN_H;

export const MainHeader = () => {
  const [isCalendarOpened, setCalendarOpened] = useState<boolean>(false);
  const calendarOpacity = useSharedValue(0);
  const {paddingTop} = useSafeAreaPadding();

  const calendarTranslate = useSharedValue(isCalendarOpened ? 0 : -TRANSLATE);

  const toggleCalendarOpened = () => {
    setCalendarOpened(!isCalendarOpened);
    ReactNativeHapticFeedback.trigger('soft', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
    calendarTranslate.value = withSpring(
      !isCalendarOpened ? 0 : -TRANSLATE,
      springAnimationConfig,
    );
  };

  const calendarStyleAnim = useAnimatedStyle(() => {
    return {
      zIndex: -100,
      transform: [{translateY: calendarTranslate.value}],
      display: calendarTranslate.value === -TRANSLATE ? 'none' : 'flex',
      opacity: calendarOpacity.value,
    };
  }, [calendarOpacity]);

  const contentStyleAnim = useAnimatedStyle(() => {
    return {
      height: withSpring(
        isCalendarOpened ? MAX_H : MIN_H,
        springAnimationConfig,
      ),
    };
  }, [isCalendarOpened]);

  useEffect(() => {
    if (isCalendarOpened) {
      calendarOpacity.value = withDelay(50, withTiming(1, {duration: 100}));
    } else {
      calendarOpacity.value = withTiming(0, {duration: 70});
    }
  }, [isCalendarOpened]);

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
