import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useSafeAreaPadding = () => {
  const { top, bottom } = useSafeAreaInsets();

  const paddingTop = top < 15 ? 15 : top;
  const paddingBottom = bottom < 15 ? 15 : bottom;

  return {
    paddingTop,
    paddingBottom,
  };
};
