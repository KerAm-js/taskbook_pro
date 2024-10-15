import { TEXT_STYLES } from "@/shared/config/style/texts";
import {
  endOfDay,
  getDate,
  getWeekDay,
  TCalendarMonth,
} from "@/shared/lib/dates";
import { ThemedPressable, ThemedText } from "@/shared/ui/Theme";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";

type TPropTypes = {
  data: TCalendarMonth;
  onDatePress: (date: number) => void;
  selectedDate: number;
};

type TItemPropTypes = {
  isSelected: boolean;
  currDate: number;
  date: number;
} & Pick<TPropTypes, "onDatePress">;

const Item: FC<TItemPropTypes> = React.memo(
  ({ date, isSelected, currDate, onDatePress }) => {
    const isFirst = getDate(date) === 1;
    const marginLeft = isFirst ? ((getWeekDay(date) || 7) - 1) * 38 : 0;
    const isCurrDate = date === currDate;
    const isTextBlue = isSelected || isCurrDate;
    const isPastDate = date < currDate;
    return (
      <ThemedPressable
        colorName={isSelected ? "accent_ultra_opacity" : "background"}
        onPress={() => onDatePress(date)}
        disabled={isPastDate}
        key={date}
        style={[styles.dateButton, { marginLeft }]}
      >
        <ThemedText
          colorName={isPastDate ? "textGrey" : isTextBlue ? "accent" : "text"}
          style={[styles.dateTitle, isTextBlue && styles.selectedDateTitle]}
        >
          {new Date(date).getDate()}
        </ThemedText>
      </ThemedPressable>
    );
  },
  (curr, next) =>
    curr.isSelected === next.isSelected && curr.currDate === next.currDate
);

export const MonthDays: FC<TPropTypes> = ({
  data,
  selectedDate,
  onDatePress,
}) => {
  const currDate = endOfDay();
  return (
    <View style={styles.container}>
      {data.days.map((date) => {
        const isSelected = date === selectedDate;
        const isCurrDate = date === currDate;
        return (
          <Item
            key={date}
            isSelected={isSelected}
            onDatePress={onDatePress}
            date={date}
            currDate={currDate}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    width: 290,
  },
  dateButton: {
    width: 38,
    height: 38,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  dateTitle: {
    marginTop: 2,
    ...TEXT_STYLES.standart,
  },
  selectedDateTitle: {
    ...TEXT_STYLES.standartSemibold,
  },
});
