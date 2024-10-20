import {
  useIsTasksDateChanging,
  useSelectedDate,
  useTaskActions,
} from '@/entities/task';
import {CalendarPopup} from '@/shared';

export const ChangeTasksDatePopup = () => {
  const visible = useIsTasksDateChanging();
  const selectedDate = useSelectedDate();
  const {setIsTasksDateChanging, changeSelectedTasksDate} = useTaskActions();

  const close = () => {
    setIsTasksDateChanging(false);
  };

  const onSubmit = (date: number) => {
    changeSelectedTasksDate(date);
  };

  return visible ? (
    <CalendarPopup onSubmit={onSubmit} value={selectedDate} hide={close} />
  ) : null;
};
