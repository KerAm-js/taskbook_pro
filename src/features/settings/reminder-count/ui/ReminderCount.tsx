import { useTaskActions, useTaskReminderSettings } from "@/entities/task";
import { ITasksState } from "@/entities/task/model/types";
import { CheckList } from "@/shared";

type TDataType = Array<{
  title: string;
  value: ITasksState["reminderSettings"]["count"];
}>;

export const SetReminderCount = () => {
  const { setRemindersCount } = useTaskActions();
  const { count } = useTaskReminderSettings();

  const data: TDataType = [
    { title: "1", value: 1 },
    { title: "2", value: 2 },
    { title: "3", value: 3 },
    { title: "4", value: 4 },
    { title: "5", value: 5 },
  ];

  const onPress = (value: ITasksState["reminderSettings"]["count"]) => {
    setRemindersCount(value);
  };

  const checkMethod = (value: number) => value === count;

  return <CheckList checkMethod={checkMethod} data={data} onPress={onPress} />;
};
