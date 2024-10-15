import { FC } from "react";
import { Text } from "react-native";
import { THEME_COLORS } from "../config/style/colors";
import { useTranslation } from "react-i18next";
import { IThemeTextProps, ThemedText } from "./Theme/ui/ThemedText";

export const CustomText: FC<
  {
    themed?: boolean;
    translate?: boolean;
  } & IThemeTextProps
> = ({
  translate = true,
  children,
  defaultTheme,
  colorName,
  themed,
  ...props
}) => {
  const { t } = useTranslation();
  const translation = t(children?.toString() || "");

  if (themed) {
    return (
      <ThemedText {...props} colorName={colorName} defaultTheme={defaultTheme}>
        {translate ? translation : children}
      </ThemedText>
    );
  }

  const color =
    defaultTheme && colorName
      ? THEME_COLORS[defaultTheme][colorName]
      : undefined;

  return (
    <Text
      style={[
        {
          color,
        },
        props.style,
      ]}
    >
      {translate ? translation : children}
    </Text>
  );
};
