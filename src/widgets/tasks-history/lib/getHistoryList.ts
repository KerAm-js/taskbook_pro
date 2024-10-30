import {ITasksState} from '@/entities/task';

export type TListItem = number | string;

export const getHistoryList = (historyIds: ITasksState['historyIds']) => {
  const dataToSet: Array<TListItem> = [];
  const dates: Array<string> = Object.keys(historyIds).sort(
    (a, b) => Number(b) - Number(a),
  );
  dates.forEach(item => {
    const date = Number(item);
    if (historyIds[date]?.length > 0) {
      dataToSet.push(item);
      historyIds[date]?.forEach(id => {
        dataToSet.push(id);
      });
    }
  });
  return dataToSet;
};
