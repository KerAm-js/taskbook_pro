import {plusCircleSvg} from '@/shared/assets/svg/plusCircle';
import {useTaskActions} from '@/entities/task';
import {IconButton, logEvent} from '@/shared';

export const AddNextTask = () => {
  const {addEmptyTask} = useTaskActions();

  const onPress = () => {
    addEmptyTask();
    logEvent('add_next_task');
  };

  return (
    <IconButton
      onPress={onPress}
      xmlGetter={plusCircleSvg}
      colorName="accent"
    />
  );
};
