import { useIsSelection } from "@/entities/task";
import { AddTask } from "@/features/tasks/add-task";
import { Undo } from "@/features/tasks/undo";
import { SCREEN_PADDING, useSafeAreaPadding } from "@/shared";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export const MainFooter = () => {
  const { paddingBottom } = useSafeAreaPadding();
  const isSelection = useIsSelection();

  const containerStyleAnim = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isSelection ? 0 : 1),
    };
  }, [isSelection]);

  const bottom = paddingBottom < 50 ? 50 : paddingBottom;

  return (
    <Animated.View style={[styles.container, { bottom }, containerStyleAnim]}>
      <Undo />
      <AddTask />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    paddingHorizontal: SCREEN_PADDING,
    height: 54,
    width: "100%",
    flexDirection: "row",
    gap: 15,
    justifyContent: "flex-end",
  },
});
