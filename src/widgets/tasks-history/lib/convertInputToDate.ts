export const convertInputToDate = (text: string, prev: string) => {
  const numbers = text
    .replace(/[^0-9]/g, '')
    .split('')
    .map(num => Number(num));

  if (numbers.length === 1 && numbers[0] > 3) {
    return null;
  }
  if (numbers.length === 2 && numbers[0] === 3 && numbers[1] > 1) {
    return null;
  }
  if (numbers.length === 3 && numbers[2] > 1) {
    return null;
  }
  if (
    numbers.length === 4 &&
    ((numbers[0] === 3 && numbers[2] === 0 && numbers[3] === 2) ||
      (numbers[2] === 1 && numbers[3] > 2))
  ) {
    return null;
  }
  if (numbers.length === 5 && numbers[4] !== 2) {
    return null;
  }
  if (numbers.length === 6 && numbers[5] !== 0) {
    return null;
  }
  if (numbers.length === 7 && numbers[6] !== 2) {
    return null;
  }
  if (numbers.length === 8 && numbers[7] < 4) {
    return null;
  }

  let result = numbers.reduce((string, item, index) => {
    return string + (index === 2 ? '.' : index === 4 ? '.' : '') + item;
  }, '');

  if (result.length === 5 && prev.length < text.length) {
    const currDate = new Date();
    const yearToAutoPrint =
      currDate.getMonth() >= 1 || currDate.getDate() > 7
        ? currDate.getFullYear()
        : currDate.getFullYear() - 1;
    result += `.${yearToAutoPrint}`;
  }

  return result;
};
