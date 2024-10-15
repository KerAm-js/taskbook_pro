import { TColorName, TTheme } from "@/shared/config/style/colors";
import { useThemeColors } from "@/shared/hooks/useTheme";
import { FC } from "react";
import { SvgProps, SvgXml } from "react-native-svg";

export interface IThemedIconProps extends SvgProps {
  defaultTheme?: TTheme;
  colorName: TColorName;
  xmlGetter: (color: string) => string;
}

export const ThemedIcon: FC<IThemedIconProps> = ({
  defaultTheme,
  colorName,
  xmlGetter,
  ...props
}) => {
  const { colors } = useThemeColors(defaultTheme);
  return <SvgXml xml={xmlGetter(colors[colorName])} {...props} />;
};
