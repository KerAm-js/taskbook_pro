import {ITasksState} from '@/entities/task';
import {useRef} from 'react';

export const useIsInitialTaskListRender = (
  selectedDate: ITasksState['selectedDate'],
) => {
  const prevDate = useRef<null | number>(null);
  const isInitialRender = useRef(false);

  if (!prevDate.current) {
    prevDate.current = selectedDate;
  } else if (prevDate.current !== selectedDate) {
    prevDate.current = selectedDate;
    isInitialRender.current = true;
  } else {
    isInitialRender.current = false;
  }

  return isInitialRender;
};
