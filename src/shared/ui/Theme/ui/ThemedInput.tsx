import { TTheme } from "@/shared/config/style/colors";
import { useThemeColors } from "@/shared/hooks/useTheme";
import React, { FC, LegacyRef } from "react";
import { TextInput, TextInputProps } from "react-native";

export interface IThemedInputProps extends TextInputProps {
  defaultTheme?: TTheme;
  inputRef?: LegacyRef<TextInput>;
}

export const ThemedInput: FC<IThemedInputProps> = ({
  defaultTheme,
  inputRef,
  style,
  ...props
}) => {
  const {
    colors: { text, textGrey, accent },
    theme,
  } = useThemeColors(defaultTheme);

  return (
    <TextInput
      ref={inputRef}
      style={[{ color: text }, style]}
      placeholderTextColor={textGrey}
      selectionColor={accent}
      cursorColor={accent}
      keyboardAppearance={theme === "night" ? "dark" : "light"}
      {...props}
    />
  );
};
