import {FC, useEffect} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {useThemeColors} from '../hooks/useTheme';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {COLORS} from '../config/style/colors';

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const Toggle: FC<{value: boolean; toggle: () => void}> = ({
  value,
  toggle,
}) => {
  const {colors} = useThemeColors();

  const colorProgress = useSharedValue(0);

  const containerStyleAnim = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      colorProgress.value,
      [0, 1],
      [colors.grey, COLORS.green],
    );
    return {
      backgroundColor,
    };
  });

  const sliderStyleAnim = useAnimatedStyle(() => {
    const translateX = interpolate(colorProgress.value, [0, 1], [0, 20]);
    return {
      transform: [{translateX}],
      backgroundColor: COLORS.white,
    };
  });

  useEffect(() => {
    colorProgress.value = withTiming(value ? 1 : 0);
  }, [value]);

  const onPress = () => {
    toggle();
    ReactNativeHapticFeedback.trigger('impactLight', hapticOptions);
  };

  return (
    <Pressable onPress={onPress} hitSlop={{top: 12, bottom: 12}}>
      <Animated.View style={[styles.container, containerStyleAnim]}>
        <Animated.View style={[styles.slider, sliderStyleAnim]} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 24,
    width: 44,
    borderRadius: 12,
    borderCurve: 'continuous',
    padding: 2,
  },
  slider: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
});
