import { useSelectedDate } from "@/entities/task";
import {
  getDateTitle,
  SCREEN_PADDING,
  TEXT_STYLES,
  THEME_COLORS,
  ThemedText,
} from "@/shared";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export const Title: FC<{ isCalendarOpened: boolean }> = ({
  isCalendarOpened,
}) => {
  const selectedDate = useSelectedDate();
  const { t } = useTranslation();

  const titleStyleAnim = useAnimatedStyle(() => {
    return {
      opacity: isCalendarOpened
        ? withTiming(0, { duration: 80 })
        : withTiming(1, { duration: 80 }),
      position: "absolute",
      bottom: 10,
      zIndex: -2,
    };
  });

  const title = getDateTitle(selectedDate, t)

  return (
    <Animated.View style={titleStyleAnim}>
      <ThemedText style={styles.title} defaultTheme="night">
        {title}
      </ThemedText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: SCREEN_PADDING,
    color: THEME_COLORS.night.text,
    ...TEXT_STYLES.titleBig,
  },
});
