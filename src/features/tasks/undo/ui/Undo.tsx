import { undoArrowSvg } from "@/shared/assets/svg/undoArrow";
import { CustomText, TEXT_STYLES, useThemeColors } from "@/shared";
import { useEffect } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { getMessage } from "../lib/getMessage";
import { useCache, useTaskActions } from "@/entities/task";

const WIDTH = Dimensions.get("screen").width;

export const Undo = () => {
  const { colors } = useThemeColors();
  const { undo, clearCache } = useTaskActions();
  const cache = useCache();
  const translationX = useSharedValue(-WIDTH);
  const opacity = useSharedValue(0);

  const containerStyleAnim = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translationX.value }],
      opacity: opacity.value,
      display: translationX.value === -WIDTH ? "none" : "flex",
    };
  });

  const toggleVisible = (visible: boolean) => {
    if (translationX.value === 0 && visible) {
      const config = { duration: 150 };
      translationX.value = withSequence(
        withTiming(-200, config),
        withTiming(0, config)
      );
      opacity.value = withSequence(
        withTiming(0, config),
        withTiming(1, config)
      );
    } else {
      translationX.value = withTiming(visible ? 0 : -WIDTH);
      opacity.value = withTiming(visible ? 1 : 0);
    }
  };

  const onPress = () => {
    if (translationX.value === 0) {
      undo();
    }
  };

  useEffect(() => {
    const { actionType } = cache;
    toggleVisible(!!actionType);

    let timout: any;
    const clear = () => {
      if (timout) {
        clearTimeout(timout);
      }
    };
    if (actionType) {
      clear();
      timout = setTimeout(() => clearCache(), 6000);
    }
    return clear;
  }, [cache]); //need handle every change of cache

  return (
    <Animated.View
      style={[
        styles.containerBackground,
        containerStyleAnim,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <Pressable
        onPress={onPress}
        style={[
          styles.container,
          {
            backgroundColor: colors.accent_ultra_opacity,
            borderColor: colors.accent_opacity
          },
        ]}
      >
        <SvgXml
          style={styles.icon}
          xml={undoArrowSvg(colors.accent)}
          width={24}
          height={24}
        />
        <View style={styles.textContainer}>
          <CustomText themed colorName="accent" style={styles.title}>
            undo
          </CustomText>
          <CustomText themed colorName="accent" style={styles.subTitle}>
            {getMessage(cache.actionType)}
          </CustomText>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  containerBackground: {
    borderRadius: 12,
    borderCurve: "continuous",
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    borderRadius: 12,
    borderCurve: "continuous",
    borderWidth: 1,
  },
  icon: {
    transform: [{ rotate: "-45deg" }],
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...TEXT_STYLES.standartBold,
  },
  subTitle: {
    ...TEXT_STYLES.small,
  },
});
