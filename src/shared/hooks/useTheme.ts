import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { TColorName, THEME_COLORS, TTheme } from "../config/style/colors";
import { useState, useEffect } from "react";
import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";

export const useTheme = () => {
  const theme = useSelector((state: RootState) => state.settings.theme);
  return theme;
};

export function useThemeColors(defaultTheme?: TTheme) {
  const theme = useTheme();
  return { colors: THEME_COLORS[defaultTheme || theme], theme };
}

export const useAnimatedThemeStyle = (
  colorName: TColorName
): ReturnType<typeof useAnimatedStyle> => {
  const { colors } = useThemeColors();
  const colorProgress = useSharedValue(0);
  const [fColor, setFColor] = useState(colors[colorName]);
  const [sColor, setSColor] = useState(colors[colorName]);

  const onColorChangeHanlder = (newColor: string) => {
    setFColor(sColor);
    colorProgress.value = 0;
    setSColor(newColor);
    colorProgress.value = withTiming(1);
  };

  useEffect(() => {
    onColorChangeHanlder(colors[colorName]);
  }, [colors]);

  const style = useAnimatedStyle(() => {
    const c = interpolateColor(colorProgress.value, [0, 1], [fColor, sColor]);
    return {
      backgroundColor: c,
    };
  });

  return style;
};
