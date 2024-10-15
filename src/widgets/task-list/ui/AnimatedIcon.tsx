import { COLORS, TColorName, useThemeColors } from "@/shared";
import React, { FC, useState } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { SvgXml } from "react-native-svg";

type TPropTypes = {
  opacity: SharedValue<number>;
  translationX: SharedValue<number>;
  isOverDragged: SharedValue<boolean>;
  xmlGetter: (color: string) => string;
  colorName?: TColorName;
  color?: keyof typeof COLORS;
  side?: "left" | "right";
};

export const AnimatedIcon: FC<TPropTypes> = ({
  opacity,
  translationX,
  isOverDragged,
  xmlGetter,
  colorName,
  color = "red",
  side = "right",
}) => {
  const easing = Easing.out(Easing.quad);
  const { colors } = useThemeColors();
  const [visible, setVisible] = useState(false); //performance optimization

  const mainIconStyleAnim = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isOverDragged.value ? 1 : 0, {
        duration: 150,
        easing,
      }),
    };
  }, [translationX.value, isOverDragged.value]);

  const greyIconStyleAnim = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isOverDragged.value ? 0 : 1, {
        duration: 150,
        easing,
      }),
    };
  }, [translationX.value, isOverDragged.value]);

  const containerStyleAnim = useAnimatedStyle(() => {
    const visible =
      side === "left" ? translationX.value > 0 : translationX.value < 0;
    return {
      opacity: visible ? opacity.value : 0,
    };
  }, [opacity.value, translationX.value]);

  useAnimatedReaction(
    () => translationX.value,
    (curr, prev) => {
      if (curr === 0) {
        runOnJS(setVisible)(false);
      } else {
        runOnJS(setVisible)(true);
      }
    }
  );

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[styles.container, { [side]: 0 }, containerStyleAnim]}
    >
      <Animated.View
        style={[styles.iconContainer, { [side]: 20 }, mainIconStyleAnim]}
      >
        <SvgXml
          width={26}
          height={26}
          xml={xmlGetter(colorName ? colors[colorName] : COLORS[color])}
        />
      </Animated.View>
      <Animated.View
        style={[styles.iconContainer, { [side]: 20 }, greyIconStyleAnim]}
      >
        <SvgXml width={26} height={26} xml={xmlGetter(colors.grey)} />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: 100,
    zIndex: -1,
  },
  iconContainer: {
    position: "absolute",
    height: "100%",
    justifyContent: "center",
  },
});
