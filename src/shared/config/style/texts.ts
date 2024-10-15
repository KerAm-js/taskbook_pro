import { TextStyle } from "react-native";

type TKey =
  | "titleBig"
  | "title"
  | "standart"
  | "standartSemibold"
  | "standartBold"
  | "small"
  | "smallSemibold"
  | "smallBold"
  | "ultraSmall";

const letterSpacing = 0.1

export const TEXT_STYLES: { [key in TKey]: TextStyle } = {
  titleBig: {
    fontSize: 25,
    fontFamily: "Gilroy-Bold",
    lineHeight: 30,
    letterSpacing,
  },
  title: {
    fontSize: 21,
    fontFamily: "Gilroy-Bold",
    lineHeight: 26,
    letterSpacing,
  },
  standart: {
    fontSize: 17,
    fontFamily: "Gilroy-Medium",
    lineHeight: 21,
    letterSpacing,
  },
  standartSemibold: {
    fontSize: 17,
    fontFamily: "Gilroy-Semibold",
    lineHeight: 21,
    letterSpacing,
  },
  standartBold: {
    fontSize: 17,
    fontFamily: "Gilroy-Bold",
    lineHeight: 21,
    letterSpacing,
  },
  small: {
    fontSize: 15,
    fontFamily: "Gilroy-Medium",
    lineHeight: 18,
    letterSpacing,
  },
  smallSemibold: {
    fontSize: 15,
    fontFamily: "Gilroy-Semibold",
    lineHeight: 18,
    letterSpacing,
  },
  smallBold: {
    fontSize: 15,
    fontFamily: "Gilroy-Bold",
    lineHeight: 18,
    letterSpacing,
  },
  ultraSmall: {
    fontSize: 13,
    fontFamily: "Gilroy-Medium",
    lineHeight: 15,
    letterSpacing,
  },
};
