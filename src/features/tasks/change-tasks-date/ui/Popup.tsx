import { useIsTasksDateChanging, useTaskActions } from "@/entities/task";
import { CalendarPopup, endOfDay } from "@/shared";

export const ChangeTasksDatePopup = () => {
  const visible = useIsTasksDateChanging();
  const { setIsTasksDateChanging, changeSelectedTasksDate } = useTaskActions();

  const close = () => {
    setIsTasksDateChanging(false);
  };

  const onSubmit = (date: number) => {
    changeSelectedTasksDate(date);
  };

  return visible ? (
    <CalendarPopup onSubmit={onSubmit} value={endOfDay()} hide={close} />
  ) : null;
};
