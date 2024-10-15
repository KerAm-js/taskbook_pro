import { TColorName, THEME_COLORS } from "@/shared/config/style/colors";
import { useTheme } from "@/shared/hooks/useTheme";
import { FC } from "react";
import { View, ViewProps, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

interface IProps extends ViewProps {
  colorName: TColorName;
  borderColorName?: TColorName;
  nightColorName?: TColorName;
  nightStyle?: Array<ViewStyle | false> | ViewStyle;
  animated?: boolean;
}

export const ThemedView: FC<IProps> = ({
  colorName,
  borderColorName,
  nightColorName,
  style,
  nightStyle,
  children,
  animated,
  ...props
}) => {
  const theme = useTheme();
  const color =
    theme === "night" && nightColorName ? nightColorName : colorName;

  const styles = [
    style,
    {
      backgroundColor: THEME_COLORS[theme][color],
    },
    borderColorName && {
      borderColor: THEME_COLORS[theme][borderColorName],
    },
    theme === "night" && nightStyle,
  ];

  if (animated) {
    return (
      <Animated.View style={styles} {...props}>
        {children}
      </Animated.View>
    );
  }
  return (
    <View style={styles} {...props}>
      {children}
    </View>
  );
};
