import { TColorName, THEME_COLORS } from "@/shared/config/style/colors";
import { useTheme } from "@/shared/hooks/useTheme";
import { FC } from "react";
import { Pressable, PressableProps, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

interface IProps extends PressableProps {
  colorName: TColorName;
  borderColorName?: TColorName;
  nightColorName?: TColorName;
  style?: Array<ViewStyle | false> | ViewStyle;
  nightStyle?: Array<ViewStyle | false> | ViewStyle;
}

export const ThemedPressable: FC<IProps> = ({
  colorName,
  borderColorName,
  nightColorName,
  style,
  nightStyle,
  children,
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

  return (
    <Pressable style={styles} {...props}>
      {children}
    </Pressable>
  );
};
