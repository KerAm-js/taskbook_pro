import {AnimatedCheck, logEvent} from '@/shared';
import {FC} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Sound from 'react-native-sound';
import {
  Task,
  useIsTaskCompleted,
  useTaskActions,
  useTaskRepeatingInfo,
} from '@/entities/task';

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export const ToggleTask: FC<Pick<Task, 'id'>> = ({id}) => {
  const isCompleted = useIsTaskCompleted(id);
  const {repeatingType, isRegular} = useTaskRepeatingInfo(id);
  const {toggleTask} = useTaskActions();

  const loadSound = async () => {
    Sound.setCategory('Playback');
    const sound = new Sound('success.mp3', Sound.MAIN_BUNDLE, error => {
      if (!error) {
        sound.play();
      }
    });
  };

  const onPressHanlder = () => {
    if (!isCompleted) {
      loadSound();
      ReactNativeHapticFeedback.trigger('notificationSuccess', hapticOptions);
    } else {
      ReactNativeHapticFeedback.trigger('soft', hapticOptions);
    }
    toggleTask(id);
    logEvent('toggle_task', {
      isCompleted: !isCompleted,
      isRegular,
      repeatingType,
    });
  };

  return (
    <Pressable style={styles.container} onPress={onPressHanlder}>
      <AnimatedCheck isChecked={isCompleted} borderRadius={6} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    paddingLeft: 15,
    height: 50,
    justifyContent: 'center',
  },
});
