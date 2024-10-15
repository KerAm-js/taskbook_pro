import { trashSvg } from "@/shared/assets/svg/trash";
import { useTaskActions } from "@/entities/task";
import { COLORS, IconButton } from "@/shared";
import { FC } from "react";

export const DeleteTasks: FC<{ buttonSize: number }> = ({
  buttonSize = 50,
}) => {
  const { deleteSelectedTasks } = useTaskActions();
  const onPress = () => deleteSelectedTasks();
  return (
    <IconButton
      staticColor={COLORS.red}
      xmlGetter={trashSvg}
      buttonSize={buttonSize}
      onPress={onPress}
      width={30}
      height={30}
    />
  );
};
