import { SharedValue, withTiming } from "react-native-reanimated";
import { TASK_ADDING_MENU_HEIGHT } from "../config/consts";
import { Dimensions } from "react-native";

const { height: HEIGHT } = Dimensions.get("screen");

type TMoveOverKeyboardProps = {
  keyboardHeight: number;
  viewHeight: SharedValue<number>;
  viewPageY: SharedValue<number>;
  translationY: SharedValue<number>;
};

export const moveOverKeyboard = ({
  keyboardHeight,
  viewHeight,
  viewPageY,
  translationY,
}: TMoveOverKeyboardProps) => {
  "worklet";
  const finalPosition =
    keyboardHeight + viewHeight.value + TASK_ADDING_MENU_HEIGHT + 30;
  const translation = finalPosition - (HEIGHT - viewPageY.value);
  translationY.value = withTiming(translation > 0 ? -translation : 0);
};

type TToBackgroundProps = {
  opacity: SharedValue<number>;
  translationY: SharedValue<number>;
};

export const toBackground = ({ opacity, translationY }: TToBackgroundProps) => {
  "worklet";
  opacity.value = withTiming(0.1);
  translationY.value = withTiming(0);
};

type TToForegroundProps = {
  opacity: SharedValue<number>;
  translationY: SharedValue<number>;
};

export const toForeground = ({ translationY, opacity }: TToForegroundProps) => {
  "worklet";
  translationY.value = withTiming(0);
  opacity.value = withTiming(1);
};
