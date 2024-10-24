import { TIME_REGEX } from "../config/consts/regex";

export type TTimeValue = { hour: number; minute: number };

type TProps =
  | {
      hour?: number;
      minute?: number;
      dateNumber?: undefined;
    }
  | { hour?: undefined; minute?: undefined; dateNumber?: number };

export const getTimeString = ({ hour, minute, dateNumber }: TProps): string => {
  let date;

  if (dateNumber) {
    date = new Date(dateNumber);
  } else if (hour !== undefined && minute !== undefined) {
    date = new Date(new Date().setHours(hour, minute));
  } else {
    return "";
  }

  return date.toTimeString().slice(0, 5);
};

export const getTime = (date: number) => {
  const result: TTimeValue = { hour: 0, minute: 0 };
  const d = new Date(date);
  result.hour = d.getHours();
  result.minute = d.getMinutes();
  return result;
};

export const getTimeValueFromString = (time: string): TTimeValue => {
  if (TIME_REGEX.test(time)) {
    const [hour, minute] = time.split(":");
    return { hour: Number(hour), minute: Number(minute) };
  } else {
    return { hour: 0, minute: 0 };
  }
};
