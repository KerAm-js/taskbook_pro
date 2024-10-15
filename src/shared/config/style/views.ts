import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export const SCREEN_PADDING = width < 390 ? 15 : 18;
export const PADDING_TOP = 30;
export const HEADER_CONTENT_HEIGHT = 40;
