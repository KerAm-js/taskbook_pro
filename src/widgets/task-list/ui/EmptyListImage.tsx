import { emptyTaskListSvg } from "@/shared/assets/svg/emptyTaskList";
import { useThemeColors } from "@/shared";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { SvgXml } from "react-native-svg";

export const EmptyListImage = () => {
  const { colors } = useThemeColors();
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={styles.container}
    >
      <SvgXml xml={emptyTaskListSvg(colors.accent)} width={250} height={250} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: (Dimensions.get("screen").height - 100) / 2 - 250,
    justifyContent: "center",
    alignItems: "center",
  },
});
