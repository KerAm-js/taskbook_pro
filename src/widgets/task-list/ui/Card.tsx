import {
  Task,
  TaskRow,
  useIsTaskTitleEditing,
  useTaskActions,
} from '@/entities/task';
import {ToggleTask} from '@/features/tasks/toggle-task';
import {
  AppStackParamsList,
  ThemedView,
  useKeyboard,
  VIEW_SHADOW,
} from '@/shared';
import React, {FC} from 'react';
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  StyleSheet,
} from 'react-native';
import {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  moveOverKeyboard,
  toBackground,
  toForeground,
} from '../lib/taskTransitions';
import {useFastInputMode} from '@/entities/settings';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type TPropTypes = Pick<Task, 'id'> & {getIsSwiped: () => boolean};

export const Card: FC<TPropTypes> = React.memo(
  ({id, getIsSwiped}) => {
    const navigation =
      useNavigation<NativeStackNavigationProp<AppStackParamsList>>();
    const isTitleEditing = useIsTaskTitleEditing(id);
    const keyboardHeight = useKeyboard();
    const translationY = useSharedValue(0);
    const opacity = useSharedValue(1);
    const viewPageY = useSharedValue(0);
    const viewHeight = useSharedValue(styles.card.minHeight);
    const {startTaskTitleEditing, setTaskToUpdateId} = useTaskActions();
    const fastInputMode = useFastInputMode();

    const cardStyleAnim = useAnimatedStyle(() => {
      return {
        transform: [{translateY: translationY.value}],
        zIndex: isTitleEditing ? 100 : 1,
        opacity: opacity.value,
        shadowOpacity: withTiming(
          isTitleEditing ? 1 : VIEW_SHADOW.shadowOpacity,
        ),
      };
    }, [translationY.value, isTitleEditing, opacity.value]);

    const onLayout = (event: LayoutChangeEvent) => {
      const newHeight = event.nativeEvent.layout.height;
      viewHeight.value = newHeight;
      if (
        isTitleEditing &&
        translationY.value < 0 &&
        newHeight !== viewHeight.value
      ) {
        translationY.value =
          translationY.value - (newHeight - viewHeight.value);
      }
    };

    const onPress = (event: GestureResponderEvent) => {
      if (getIsSwiped()) return;
      if (fastInputMode) {
        startTaskTitleEditing(id);
        event.target.measure((x, y, w, h, px, py) => {
          viewPageY.value = py;
        });
      } else {
        setTaskToUpdateId(id);
        navigation.navigate('Task');
      }
    };

    useAnimatedReaction(
      () => keyboardHeight.value,
      curr => {
        if (!fastInputMode) return;
        if (curr && isTitleEditing) {
          moveOverKeyboard({
            keyboardHeight: curr,
            translationY,
            viewHeight,
            viewPageY,
          });
        } else if (curr && !isTitleEditing) {
          toBackground({
            opacity,
            translationY,
          });
        } else {
          toForeground({
            opacity,
            translationY,
          });
        }
      },
    );

    return (
      <ThemedView
        animated
        style={[styles.card, VIEW_SHADOW, cardStyleAnim]}
        nightStyle={styles.taskNight}
        colorName="background"
        nightColorName="backgroundSecond">
        <ToggleTask id={id} />
        <TaskRow id={id} onPress={onPress} onLayout={onLayout} />
      </ThemedView>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    minHeight: 50,
    borderRadius: 10,
    borderCurve: 'continuous',
  },
  taskNight: {
    shadowColor: 'rgba(0, 0, 0, 0)',
  },
});
