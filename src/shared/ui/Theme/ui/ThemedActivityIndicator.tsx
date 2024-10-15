import { TColorName, TTheme } from "@/shared/config/style/colors";
import { useThemeColors } from "@/shared/hooks/useTheme";
import { FC } from "react";
import { ActivityIndicator, ActivityIndicatorProps, Text } from "react-native";

export interface IThemedActivityIndicatorProps extends ActivityIndicatorProps {
  defaultTheme?: TTheme;
  colorName?: TColorName;
}

export const ThemedActivityIndicator: FC<IThemedActivityIndicatorProps> = ({
  colorName,
  defaultTheme,
  ...props
}) => {
  const { colors } = useThemeColors(defaultTheme);
  return <ActivityIndicator color={colors[colorName || "accent"]} {...props} />;
};
