import { FC, useCallback, useRef, useState } from "react";
import { Popup, TPopupPropTypes } from "../hoc/Popup";
import {
  FlatList,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import { MONTHS } from "@/shared/consts/datetime";
import { WeekDayTitles } from "./WeekDayTitles";
import { SlideButton } from "./SlideButton";
import { TEXT_STYLES } from "@/shared/config/style/texts";
import { MonthDays } from "./MonthDays";
import { ThemedText } from "@/shared/ui/Theme";
import { useTranslation } from "react-i18next";
import {
  getCalendarMonths,
  TCalendarMonth,
} from "@/shared/lib/dates";

type TPropTypes = {
  onSubmit: (value: number) => void;
  value: number;
  hide: TPopupPropTypes["hide"];
};

const WIDTH = 290;

export const CalendarPopup: FC<TPropTypes> = ({ hide, onSubmit, value }) => {
  const currDate = new Date();
  const { t } = useTranslation();
  const flatList = useRef<FlatList>(null);
  const index = useRef(0);
  const [date, setDate] = useState(value);
  const [month, setMonth] = useState(currDate.getMonth());
  const [year, setYear] = useState(currDate.getFullYear());
  const [calendar, setCalendar] = useState<Array<TCalendarMonth>>(
    getCalendarMonths(month, year, 3)
  );

  const onSubmitHandler = () => {
    onSubmit(date);
    hide();
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(event.nativeEvent.contentOffset.x / WIDTH);
    if (index.current !== i) {
      index.current = i;
      setYear(calendar[i].year);
      setMonth(calendar[i].month);
    }
  };

  const scrollToNextIndex = (side: "left" | "right") => {
    const cantScroll =
      (side === "left" && index.current === 0) ||
      (side === "right" && index.current === calendar.length - 1);
      
    if (flatList.current && !cantScroll) {
      flatList.current.scrollToIndex({
        animated: true,
        index: index.current + (side === "left" ? -1 : 1),
      });
    }
  };

  const updateCalendar = () => {
    const lastMonth = calendar[calendar.length - 1];
    setCalendar([
      ...calendar,
      ...getCalendarMonths(lastMonth.month + 1, lastMonth.year, 3),
    ]);
  };

  const title =
    t(MONTHS[month]) + (year > currDate.getFullYear() ? " " + year : "");

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<TCalendarMonth>) => {
      const onPress = (value: number) => {
        setDate(value);
      };
      return (
        <MonthDays data={item} onDatePress={onPress} selectedDate={date} />
      );
    },
    [date]
  );

  const keyExtractor = useCallback(
    (item: TCalendarMonth) => item.month + "." + item.year,
    []
  );

  return (
    <Popup onSubmit={onSubmitHandler} hide={hide}>
      <View style={styles.container}>
        <View style={styles.header}>
          <SlideButton onPress={() => scrollToNextIndex("left")} side="left" />
          <ThemedText style={styles.title}>{title}</ThemedText>
          <SlideButton
            onPress={() => scrollToNextIndex("right")}
            side="right"
          />
        </View>
        <WeekDayTitles />
        <FlatList
          ref={flatList}
          style={styles.flatList}
          data={calendar}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onScroll={onScroll}
          initialNumToRender={2}
          onEndReached={updateCalendar}
          onEndReachedThreshold={0.5}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          getItemLayout={(_, index) => ({
            length: WIDTH,
            offset: WIDTH * index,
            index,
          })}
        />
      </View>
    </Popup>
  );
};

export const styles = StyleSheet.create({
  container: {
    width: WIDTH,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  flatList: {
    minHeight: 228,
  },
  title: {
    ...TEXT_STYLES.standartBold,
  },
});
