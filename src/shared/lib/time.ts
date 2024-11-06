import {TIME_REGEX} from '../config/consts/regex';

export type TTimeValue = {hour: number; minute: number};

export const getTimeString = ({hour, minute}: TTimeValue): string => {
  const hourString = hour < 10 ? '0' + hour : hour;
  const minuteString = minute < 10 ? '0' + minute : minute;
  return hourString + ':' + minuteString;
};

export const getTime = (date: number) => {
  const result: TTimeValue = {hour: 0, minute: 0};
  const d = new Date(date);
  result.hour = d.getHours();
  result.minute = d.getMinutes();
  return result;
};

export const getTimeValueFromString = (time: string): TTimeValue => {
  if (TIME_REGEX.test(time)) {
    const [hour, minute] = time.split(':');
    return {hour: Number(hour), minute: Number(minute)};
  } else {
    return {hour: 0, minute: 0};
  }
};
