import { FC } from "react";
import { StyleSheet } from "react-native";
import Animated, { interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { ThemedText } from "../../../Theme/ui/ThemedText";
import { TEXT_STYLES } from "@/shared/config/style/texts";

export type TSide = "left" | "right";
export type TItem = string;
type TItemPropTypes = {
  title: TItem;
  side: TSide;
  scrollY: SharedValue<number>;
  index: number;
};

export const ITEM_HEIGHT = 37;

export const hours = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];

export const minutes = [
  "00",
  "05",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
];

export const Item: FC<TItemPropTypes> = ({ title, side, scrollY, index }) => {
  const center = index * ITEM_HEIGHT;
  const styleAnim = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [
        center - ITEM_HEIGHT * 2,
        center - ITEM_HEIGHT / 1.5,
        center,
        center + ITEM_HEIGHT / 1.5,
        center + ITEM_HEIGHT * 2,
      ],
      [0.1, 0.5, 1, 0.5, 0.1]
    );
    return {
      opacity,
    };
  }, [scrollY.value]);

  return (
    <Animated.View
      style={[
        styles.item,
        side === "left" ? styles.leftItem : styles.rightItem,
        styleAnim,
      ]}
    >
      <ThemedText colorName="text" style={styles.itemTitle}>{title}</ThemedText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: ITEM_HEIGHT,
    flex: 1,
    justifyContent: "center",
  },
  leftItem: {
    paddingLeft: 30,
  },
  rightItem: {
    paddingRight: 30,
  },
  itemTitle: {
    ...TEXT_STYLES.standart,
    fontSize: 23,
    lineHeight: undefined,
    marginTop: 2,
    width: "100%",
    textAlign: "center",
  },
});