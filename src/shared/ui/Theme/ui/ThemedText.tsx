import { TColorName, TTheme } from "@/shared/config/style/colors";
import { useThemeColors } from "@/shared/hooks/useTheme";
import { FC } from "react";
import { Text, TextProps } from "react-native";

export interface IThemeTextProps extends TextProps {
  defaultTheme?: TTheme;
  colorName?: TColorName;
}

export const ThemedText: FC<IThemeTextProps> = ({
  children,
  colorName,
  defaultTheme,
  style,
}) => {
  const {
    colors,
  } = useThemeColors(defaultTheme);
  if (children) {
    return (
      <Text style={[{ color: colors[colorName || 'text'] }, style]}>
        {children}
      </Text>
    );
  }
};
