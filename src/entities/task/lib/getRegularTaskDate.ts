import {endOfDay} from '@/shared';
import {RegularTaskDto} from '../model/types';
import {getDateLater} from '@/shared/lib/dates';

export const getNextRegularTaskDate = ({
  repeatingDays,
  repeatingType,
  isFirstDate,
  defaultBaseDate,
}: Pick<RegularTaskDto, 'repeatingDays' | 'repeatingType'> & {
  defaultBaseDate?: number;
  isFirstDate?: boolean;
}) => {
  const baseDate = defaultBaseDate ? new Date(defaultBaseDate) : new Date();

  let result: number | Date = isFirstDate
    ? baseDate.valueOf()
    : getDateLater(1, baseDate.valueOf());

  if (repeatingType === 'weekly') {
    const day = baseDate.getDay();
    const currWeekDay = day ? day - 1 : 6;
    const nextRepeat = repeatingDays.find(day =>
      isFirstDate ? day >= currWeekDay : day > currWeekDay,
    );
    const daysDiff = nextRepeat
      ? nextRepeat - currWeekDay
      : 7 - currWeekDay + repeatingDays[0];
    result = getDateLater(daysDiff, baseDate.valueOf());
  } else if (repeatingType === 'monthly') {
    const curr = baseDate.getDate();
    const lastDayOfCurrMonth = new Date(
      baseDate.getFullYear(),
      baseDate.getMonth() + 1,
      0,
    ).getDate();
    const nextRepeat = repeatingDays.find(day =>
      isFirstDate ? day >= curr : day > curr,
    );
    if (
      nextRepeat &&
      (isFirstDate ? lastDayOfCurrMonth >= curr : lastDayOfCurrMonth > curr)
    ) {
      const date =
        nextRepeat > lastDayOfCurrMonth
          ? new Date(
              baseDate.getFullYear(),
              baseDate.getMonth(),
              lastDayOfCurrMonth,
            )
          : new Date(baseDate.getFullYear(), baseDate.getMonth(), nextRepeat);
      result = date.valueOf();
    } else {
      const lastDayOfNextMonth = new Date(
        baseDate.getFullYear(),
        baseDate.getMonth() + 2,
        0,
      ).getDate();
      const date = repeatingDays[0] < lastDayOfNextMonth ? repeatingDays[0] : lastDayOfNextMonth
      result = new Date(
        baseDate.getFullYear(),
        baseDate.getMonth() + 1,
        date,
      );
    }
  }
  return endOfDay(result);
};
