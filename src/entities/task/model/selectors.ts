import { RootState } from "@/app/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectTaskById = createSelector(
  [(state: RootState) => state.tasks.entities, (_, taskId: number) => taskId],
  (entities, taskId) => entities[taskId] || {}
);

export const selectCompletedTaskEntities = createSelector(
  [
    (state: RootState) => state.tasks.entities,
    (state: RootState) => state.tasks.ids,
    (_, date: number) => date,
  ],
  (entities, ids, date) => {
    const result = ids[date].filter((id) => entities[id]?.isCompleted);
    return result;
  }
);

export const selectCompletedTasksCount = createSelector(
  [
    (state: RootState) => state.tasks.entities,
    (state: RootState) => state.tasks.selectedDate,
    (state: RootState) => state.tasks.ids,
  ],
  (entities, selectedDate, ids) => {
    let count = 0;
    ids[selectedDate].forEach((id) => {
      if (entities[id].isCompleted) count++;
    });
    return count;
  }
);
