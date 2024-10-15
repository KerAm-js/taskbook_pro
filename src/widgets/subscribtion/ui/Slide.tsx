import { THEME_ICON_GRADIENTS, useTheme } from "@/shared";
import { THEME_ICON_GRADIENTS_OPACITY } from "@/shared/config/style/colors";
import { FC } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SvgXml } from "react-native-svg";

const WIDTH = Dimensions.get("screen").width;

type TSlideProps = {
  xmlGetter: (colors: string[]) => string;
  index: number;
  scrollX: SharedValue<number>;
};

export const ITEM_WIDTH = WIDTH;

export const Slide: FC<TSlideProps> = ({ xmlGetter, index, scrollX }) => {
  const theme = useTheme();
  const center = index * ITEM_WIDTH;

  const circleStyleAnim = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [center - ITEM_WIDTH, center, center + ITEM_WIDTH],
      [0.6, 1, 0.6],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale }],
    };
  }, [scrollX.value]);

  const containerStyleAnim = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      [center - ITEM_WIDTH * 2, center, center + ITEM_WIDTH * 2],
      [-1.2 * ITEM_WIDTH, 0, 1.2 * ITEM_WIDTH],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ translateX }],
    };
  }, [scrollX.value]);

  return (
    <Animated.View style={[styles.container, containerStyleAnim]}>
      <Animated.View style={circleStyleAnim}>
        <LinearGradient
          style={styles.circle}
          colors={THEME_ICON_GRADIENTS_OPACITY[theme]}
        >
          <SvgXml xml={xmlGetter(THEME_ICON_GRADIENTS[theme])} />
        </LinearGradient>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    paddingTop: 50,
    paddingBottom: 25,
    alignItems: "center",
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
