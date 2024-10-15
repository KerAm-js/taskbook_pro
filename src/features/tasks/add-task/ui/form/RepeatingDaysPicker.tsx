import {
  CustomText,
  SCREEN_PADDING,
  TEXT_STYLES,
  ThemedPressable,
} from "@/shared";
import { FC } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

export type TSelectedItemObj = { [key: number]: boolean };

type TPropTypes = {
  title: string;
  disabled?: boolean;
  titleGetter?: (item: number) => string;
  data: Array<number>;
  selectedItems: TSelectedItemObj;
  onSelect: (value: number) => void;
};

export const RepeatingDaysPicker: FC<TPropTypes> = ({
  title,
  titleGetter,
  disabled,
  data,
  selectedItems,
  onSelect,
}) => {
  return (
    <View style={[styles.container, disabled && styles.disabledContainer]}>
      <CustomText translate themed style={styles.title}>
        {title}
      </CustomText>
      <View style={styles.itemsContainer}>
        {data.map((item) => (
          <ThemedPressable
            key={item}
            colorName={
              selectedItems[item] ? "accent_ultra_opacity" : "background"
            }
            disabled={disabled}
            onPress={() => onSelect(item)}
            style={[styles.item, selectedItems[item] && { borderRadius: 20 }]}
          >
            <CustomText
              translate
              themed
              colorName={selectedItems[item] ? "accent" : "text"}
              style={
                selectedItems[item]
                  ? TEXT_STYLES.standartBold
                  : TEXT_STYLES.standartSemibold
              }
            >
              {titleGetter ? titleGetter(item) : item.toString()}
            </CustomText>
          </ThemedPressable>
        ))}
      </View>
    </View>
  );
};

const WIDTH = Dimensions.get("screen").width;
const GAP = (WIDTH - SCREEN_PADDING * 2 - 280) / 6;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  disabledContainer: {
    opacity: 0.5,
  },
  title: {
    ...TEXT_STYLES.standartBold,
    marginBottom: 7,
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: GAP,
  },
  item: {
    width: 40,
    height: 40,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTitle: {
    ...TEXT_STYLES.smallSemibold,
  },
});
