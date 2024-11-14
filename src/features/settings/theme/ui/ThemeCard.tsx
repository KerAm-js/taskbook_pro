import {
  AnimatedCheck,
  CustomText,
  THEME_COLORS,
  useTheme,
  COLORS,
  TEXT_STYLES,
} from "@/shared";
import { FC } from "react";
import { Appearance, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { TTheme } from "@/shared/config/style/colors";
import { useSettingsActions } from "@/entities/settings";

export const ThemeCard: FC<{ theme: TTheme }> = ({ theme }) => {
  const { setTheme } = useSettingsActions();
  const currentTheme = useTheme();

  const onPress = () => {
    if (theme === "night") {
      Appearance.setColorScheme("dark");
    } else {
      Appearance.setColorScheme("light");
    }
    setTheme(theme);
  };

  const containerStyleAnim = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(currentTheme === theme ? 1 : 0.95) }],
    };
  }, [currentTheme]);

  return (
    <Animated.View style={containerStyleAnim}>
      <View
        style={[
          styles.shadowContainer,
          currentTheme === "night" && styles.shadowNight,
          { backgroundColor: THEME_COLORS[theme].background },
        ]}
      >
        <Pressable
          style={[
            styles.container,
            { backgroundColor: THEME_COLORS[theme].background },
          ]}
          onPress={onPress}
        >
          <View
            style={[
              styles.header,
              { backgroundColor: THEME_COLORS[theme].header },
            ]}
          >
            <CustomText style={styles.title}>{theme}</CustomText>
            <AnimatedCheck
              defaultTheme="night"
              isChecked={currentTheme === theme}
              size={22}
            />
          </View>
          <View style={styles.body}>
            <View style={styles.lineContainer}>
              <AnimatedCheck
                defaultTheme={theme}
                isChecked={false}
                borderRadius={5}
                size={18}
              />
              <View
                style={[
                  styles.line,
                  {
                    width: "80%",
                    backgroundColor: THEME_COLORS[theme].lineGrey,
                  },
                ]}
              />
            </View>
            <View style={styles.lineContainer}>
              <AnimatedCheck
                defaultTheme={theme}
                isChecked={false}
                borderRadius={5}
                size={18}
              />
              <View
                style={[
                  styles.line,
                  {
                    width: "50%",
                    backgroundColor: THEME_COLORS[theme].lineGrey,
                  },
                ]}
              />
            </View>
          </View>
        </Pressable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 15,
    borderCurve: "continuous",
  },
  shadowContainer: {
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowColor: COLORS.shadow,
    shadowRadius: 10,
    marginBottom: 15,
    borderRadius: 20,
    borderCurve: "continuous",
  },
  shadowNight: {
    shadowColor: THEME_COLORS.night.backgroundSecond,
    shadowOpacity: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    paddingRight: 10,
  },
  title: {
    color: THEME_COLORS.night.text,
    alignSelf: "flex-end",
    ...TEXT_STYLES.standartBold,
  },
  body: {
    padding: 15,
    paddingTop: 10,
    paddingBottom: 20,
    gap: 10,
  },
  line: {
    borderRadius: 2,
    height: 10,
    borderCurve: "continuous",
  },
  lineContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
