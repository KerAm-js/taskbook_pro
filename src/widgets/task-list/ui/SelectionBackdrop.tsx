import {
  Task,
  useIsSelection,
  useTaskActions,
  useTaskData,
} from '@/entities/task';
import {useThemeColors} from '@/shared';
import {FC} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {SharedValue} from 'react-native-reanimated';

type TPropTypes = Pick<Task, 'id'> & {translationX: SharedValue<number>};

export const SelectionBackdrop: FC<TPropTypes> = ({id, translationX}) => {
  const {toggleTaskSelected} = useTaskActions();
  const task = useTaskData(id);
  const {colors} = useThemeColors();
  const {isSelected} = task;
  const isSelection = useIsSelection();

  const onSelect = () => {
    if (translationX.value !== 0) return;
    toggleTaskSelected(id);
  };

  if (!isSelection) {
    return null;
  }

  return (
    <Pressable
      onPress={onSelect}
      style={[
        styles.selectionPressable,
        isSelected && {backgroundColor: colors.accent_ultra_opacity},
      ]}
    />
  );
};

const styles = StyleSheet.create({
  selectionPressable: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
    borderRadius: 10,
    borderCurve: 'continuous',
  },
});
