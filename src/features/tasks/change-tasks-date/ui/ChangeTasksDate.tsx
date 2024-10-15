import { calendarSvg } from "@/shared/assets/svg/calendar";
import { useTaskActions } from "@/entities/task";
import { IconButton } from "@/shared";
import { FC } from "react";

export const ChangeTasksDate: FC<{ buttonSize: number }> = ({
  buttonSize = 50,
}) => {
  const { setIsTasksDateChanging } = useTaskActions();
  const onPress = () => setIsTasksDateChanging(true);
  return (
    <IconButton
      onPress={onPress}
      colorName="accent"
      xmlGetter={calendarSvg}
      buttonSize={buttonSize}
      width={30}
      height={30}
    />
  );
};
