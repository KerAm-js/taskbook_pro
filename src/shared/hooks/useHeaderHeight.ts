import { HEADER_CONTENT_HEIGHT } from "../config/style/views";
import { useSafeAreaPadding } from "./useSafeAreaPadding";

export const useHeaderHeight = () => {
  const { paddingTop } = useSafeAreaPadding();
  return paddingTop + HEADER_CONTENT_HEIGHT;
};
