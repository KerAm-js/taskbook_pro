import { FC } from "react";
import { Pressable, StyleSheet } from "react-native";
import { SvgXml, SvgProps } from "react-native-svg";
import { useThemeColors } from "../hooks/useTheme";
import { TColorName, TTheme } from "../config/style/colors";

type TPropTypes = SvgProps & {
  xmlGetter: (color: string) => string;
  defaultTheme?: TTheme;
  buttonSize?: number;
  onPress?: () => void;
  disabled?: boolean;
  colorName?: TColorName;
  staticColor?: string;
};

export const IconButton: FC<TPropTypes> = ({
  buttonSize = 40,
  xmlGetter,
  defaultTheme,
  onPress,
  colorName,
  staticColor,
  disabled,
  ...props
}) => {
  const { colors } = useThemeColors(defaultTheme);
  const finalColor = colorName ? colors[colorName] : staticColor;
  return (
    <Pressable
      style={[
        styles.container,
        {
          width: buttonSize,
          height: buttonSize,
        },
      ]}
      onPress={onPress ? onPress : () => {}}
      disabled={disabled}
    >
      <SvgXml xml={xmlGetter(finalColor || "")} {...props} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
