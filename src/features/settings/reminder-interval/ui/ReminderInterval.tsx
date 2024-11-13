import { useTaskActions, useTaskReminderSettings } from "@/entities/task";
import { ITasksState } from "@/entities/task/model/types";
import { CheckList } from "@/shared";
import { useTranslation } from "react-i18next";

type TDataType = Array<{
  title: string;
  value: ITasksState["reminderSettings"]["interval"];
}>;

export const SetReminderInterval = () => {
  const { setRemindersInterval } = useTaskActions();
  const { interval } = useTaskReminderSettings();
  const { t } = useTranslation();

  const data: TDataType = [
    { title: t("min", { count: 1 }), value: 1 },
    { title: t("min", { count: 5 }), value: 5 },
    { title: t("min", { count: 10 }), value: 10 },
    { title: t("min", { count: 15 }), value: 15 },
    { title: t("min", { count: 20 }), value: 20 },
    { title: t("min", { count: 25 }), value: 25 },
    { title: t("min", { count: 30 }), value: 30 },
    { title: t("min", { count: 45 }), value: 40 },
    { title: t("hour", { count: 1 }), value: 60 },
    { title: t("hour", { count: 1.5 }), value: 90 },
    { title: t("hour", { count: 2 }), value: 120 },
    { title: t("hour", { count: 3 }), value: 180 },
  ];

  const onPress = (value: ITasksState["reminderSettings"]["interval"]) => {
    setRemindersInterval(value);
  };

  const checkMethod = (value: number) => value === interval;

  return <CheckList checkMethod={checkMethod} data={data} onPress={onPress} />;
};
