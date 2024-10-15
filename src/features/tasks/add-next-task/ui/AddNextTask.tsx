import { plusCircleSvg } from "@/shared/assets/svg/plusCircle";
import { useTaskActions } from "@/entities/task";
import { IconButton } from "@/shared";

export const AddNextTask = () => {
  const { addEmptyTask } = useTaskActions();

  const onPress = () => {
    addEmptyTask();
  };

  return (
    <IconButton
      onPress={onPress}
      xmlGetter={plusCircleSvg}
      colorName="accent"
    />
  );
};
