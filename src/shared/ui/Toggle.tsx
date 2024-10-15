import { FC, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useThemeColors } from "../hooks/useTheme";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { COLORS } from "../config/style/colors";

export const Toggle: FC<{ value: boolean }> = ({ value }) => {
  const { colors } = useThemeColors();

  const colorProgress = useSharedValue(0);

  const containerStyleAnim = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      colorProgress.value,
      [0, 1],
      [colors.grey, COLORS.green]
    );
    return {
      backgroundColor,
    };
  });

  const sliderStyleAnim = useAnimatedStyle(() => {
    const translateX = interpolate(colorProgress.value, [0, 1], [0, 20]);
    return {
      transform: [{ translateX }],
      backgroundColor: COLORS.white
    };
  });

  useEffect(() => {
    colorProgress.value = withTiming(value ? 1 : 0);
  }, [value]);

  return (
    <Animated.View style={[styles.container, containerStyleAnim]}>
      <Animated.View style={[styles.slider, sliderStyleAnim]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 24,
    width: 44,
    borderRadius: 12,
    borderCurve: "continuous",
    padding: 2,
  },
  slider: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
});
