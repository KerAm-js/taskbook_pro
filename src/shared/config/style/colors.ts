type TColorSet = {
  text: string;
  accent: string;
  accent_opacity: string;
  accent_ultra_opacity: string;
  background: string;
  backgroundSecond: string;
  input: string;
  grey: string;
  textGrey: string;
  lineGrey: string;
  header: string;
  destructive: string;
  destructiveOpacity: string;
};

const textOpacity = 0.45;
const opacity = 0.2;

export type TTheme = "branded" | "night" | "purple" | "darkBlue";

export const COLORS = {
  black: "#000",
  blue: `rgba(0, 104, 217, 1)`,
  blueOpacity: `rgba(0, 104, 217, ${opacity})`,
  blueUltraOpacity: "rgba(0, 104, 217, 0.15)",
  darkBlue: `rgba(64, 72, 101, 1)`,
  darkBlueOpacity: `rgba(64, 72, 101, ${opacity})`,
  darkBlueUltraOpacity: "rgba(64, 72, 101, 0.15)",
  purple: `rgba(112, 109, 229, 1)`,
  purpleOpacity: "rgba(112, 109, 229, 0.15)",
  purpleUltraOpacity: "rgba(112, 109, 229, 0.15)",
  green: `rgba(52, 199, 89, 1)`,
  greenOpacity: "rgba(52, 199, 89, 0.1",
  red: `rgba(255, 34, 22, 1)`,
  redOpacity: "rgba(255, 34, 22, 0.1)",
  grey: `rgba(0, 0, 0, ${opacity})`,
  textGrey: `rgba(0, 0, 0, ${textOpacity})`,
  lineGrey: "rgba(0, 0, 0, 0.08)",
  whiteOpacity: `rgba(250, 250, 250, ${opacity})`,
  whiteUltraOpacity: "rgba(250, 250, 250, 0.08)",
  white: `#fff`,
  input: `#f2f3f5`,
  shadow: `#DAE0EB`,
};

export const THEME_GRADIENTS: { [key in TTheme]: Array<string> } = {
  branded: [`#004FA6`, `#007AFF`],
  night: [`#535D82`, `#363C55`],
  darkBlue: [`#363C55`, `#5F6B95`],
  purple: [`#464490`, `#7C78FF`],
};

export const THEME_ICON_GRADIENTS: { [key in TTheme]: [string, string] } = {
  branded: [`#55A7FF`, `#0068D9`],
  night: [`#A5B3E7`, `#FFF`],
  darkBlue: [`#7280B4`, `#404865`],
  purple: [`#ACAAFF`, `#5C5AB6`],
};

export const THEME_ICON_GRADIENTS_OPACITY: { [key in TTheme]: [string, string] } = {
  branded: [`rgba(85, 167, 255, 0.15)`, `rgba(0, 104, 217, 0.15)`],
  night: [`rgba(260, 260, 260, 0.08)`, `rgba(260, 260, 260, 0.15)`],
  darkBlue: [`rgba(114, 128, 180, 0.15)`, `rgba(64, 72, 101, 0.15)`],
  purple: [`rgba(165, 179, 231, 0.15)`, `rgba(92, 90, 182, 0.15)`],
};

export type TColorName = keyof typeof THEME_COLORS.branded;

export const THEME_COLORS: { [key in TTheme]: TColorSet } = {
  branded: {
    text: COLORS.black,
    accent: COLORS.blue,
    accent_opacity: COLORS.blueOpacity,
    accent_ultra_opacity: COLORS.blueUltraOpacity,
    background: COLORS.white,
    backgroundSecond: COLORS.input,
    input: COLORS.input,
    grey: COLORS.grey,
    textGrey: COLORS.textGrey,
    lineGrey: COLORS.lineGrey,
    header: COLORS.blue,
    destructive: COLORS.red,
    destructiveOpacity: COLORS.redOpacity,
  },
  night: {
    text: COLORS.white,
    accent: COLORS.white,
    accent_opacity: COLORS.whiteOpacity,
    accent_ultra_opacity: COLORS.whiteUltraOpacity,
    background: `#404865`,
    backgroundSecond: "#363C55",
    input: "#363C55",
    grey: COLORS.whiteOpacity,
    textGrey: `rgba(250, 250, 250, ${textOpacity})`,
    lineGrey: "rgba(250, 250, 250, 0.1)",
    header: "#363C55",
    destructive: "rgba(255, 52, 40, 1)",
    destructiveOpacity: "rgba(255, 52, 40, 0.15)",
  },
  darkBlue: {
    text: COLORS.black,
    accent: COLORS.darkBlue,
    accent_opacity: COLORS.darkBlueOpacity,
    accent_ultra_opacity: COLORS.darkBlueUltraOpacity,
    background: COLORS.white,
    backgroundSecond: COLORS.input,
    input: COLORS.input,
    grey: COLORS.grey,
    textGrey: COLORS.textGrey,
    lineGrey: COLORS.lineGrey,
    header: COLORS.darkBlue,
    destructive: COLORS.red,
    destructiveOpacity: COLORS.redOpacity,
  },
  purple: {
    text: COLORS.black,
    accent: COLORS.purple,
    accent_opacity: COLORS.purpleOpacity,
    accent_ultra_opacity: COLORS.purpleUltraOpacity,
    background: COLORS.white,
    backgroundSecond: COLORS.input,
    input: COLORS.input,
    grey: COLORS.grey,
    textGrey: COLORS.textGrey,
    lineGrey: COLORS.lineGrey,
    header: COLORS.purple,
    destructive: COLORS.red,
    destructiveOpacity: COLORS.redOpacity,
  },
};
