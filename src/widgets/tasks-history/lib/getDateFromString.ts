import {endOfDay} from '@/shared';

export const getDateFromString = (dateString: string) => {
  const [day, month, year] = dateString.split('.');
  return endOfDay(new Date(Number(year), Number(month) - 1, Number(day)));
};
