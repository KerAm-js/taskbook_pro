import { TIME_IN_TASK_REGEX } from "../consts/regex";

export const findAndDeleteTime = (
  value: string
): {
  newText: string;
  hour?: string;
  minute?: string;
} => {
  let newText = value;
  let hour;
  let minute;

  const shouldCheckAtTheStart = value.length === 5 || value.length === 6;

  const strToCheck = shouldCheckAtTheStart
    ? value.slice(0, 6)
    : value.slice(value.length - 6);

  const timeStr = TIME_IN_TASK_REGEX.exec(strToCheck);

  if (timeStr) {
    [hour, minute] = timeStr[0].trim().split(":");
    if (value.length === 5) {
      newText = value.slice(5);
    } else if (value.length === 6) {
      newText = value.slice(6);
    } else {
      newText = value.slice(0, value.length - 6);
    }
  }

  return {
    newText,
    hour,
    minute,
  };
};
