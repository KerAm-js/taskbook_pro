import { endOfDay } from "@/shared";
import { RegularTaskDto } from "../model/types";
import { getDateLater } from "@/shared/lib/dates";

export const getNextRegularTaskDate = ({
  repeatingDays,
  repeatingType,
  includeToday,
  startDate,
}: Pick<RegularTaskDto, "repeatingDays" | "repeatingType"> & {
  startDate?: number;
  includeToday?: boolean;
}) => {
  const currDate = startDate ? new Date(startDate) : new Date();
  let result: number | Date = includeToday
    ? currDate.valueOf()
    : getDateLater(1, currDate.valueOf());
  if (repeatingType === "weekly") {
    const day = currDate.getDay();
    const currWeekDay = day ? day - 1 : 6;
    const nextRepeat = repeatingDays.find((day) =>
      includeToday ? day >= currWeekDay : day > currWeekDay
    );
    const daysDiff = nextRepeat
      ? nextRepeat - currWeekDay
      : 7 - currWeekDay + repeatingDays[0];
    result = getDateLater(daysDiff, currDate.valueOf());
  } else if (repeatingType === "monthly") {
    const curr = currDate.getDate();
    const lastDayOfCurrMonth = new Date(
      currDate.getFullYear(),
      currDate.getMonth() + 1,
      0
    ).getDate();
    const nextRepeat = repeatingDays.find((day) =>
      includeToday ? day >= curr : day > curr
    );
    if (nextRepeat) {
      const date =
        nextRepeat > lastDayOfCurrMonth
          ? new Date(
              currDate.getFullYear(),
              currDate.getMonth(),
              lastDayOfCurrMonth
            )
          : new Date(currDate.getFullYear(), currDate.getMonth(), nextRepeat);
      result = date.valueOf();
    } else {
      result = new Date(
        currDate.getFullYear(),
        currDate.getMonth() + 1,
        repeatingDays[0]
      );
    }
  }
  return endOfDay(result);
};
