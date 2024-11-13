import {Task} from '@/entities/task';
import {logEvent} from '@/shared';
import {useEffect, useRef} from 'react';

export const useFifteenTasksAddedForOneDayLogger = (
  isInitialRender: boolean,
  selectedDate: number,
  taskIds: Task['id'][],
) => {
  const tasksCountsByDay = useRef<{[key: number]: number}>({});

  useEffect(() => {
    if (taskIds.length >= 15 && !tasksCountsByDay.current[selectedDate]) {
      tasksCountsByDay.current[selectedDate] = taskIds.length;
      if (!isInitialRender) {
        logEvent('fifteen_tasks_added_for_one_day');
      }
    }
  }, [taskIds, selectedDate]);
};
