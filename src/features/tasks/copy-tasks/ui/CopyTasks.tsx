import { copySvg } from "@/shared/assets/svg/copy";
import { useTaskActions } from "@/entities/task";
import { IconButton } from "@/shared";
import { FC } from "react";

export const CopyTasks: FC<{ buttonSize: number }> = ({
  buttonSize = 50,
}) => {
  const { copySelectedTasks } = useTaskActions();
  const onPress = () => copySelectedTasks();
  return (
    <IconButton
      colorName="accent"
      xmlGetter={copySvg}
      buttonSize={buttonSize}
      onPress={onPress}
      width={30}
      height={30}
    />
  );
};
