import {FC, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Task} from '../model/types';
import {TextInput} from 'react-native-gesture-handler';
import {TEXT_STYLES, ThemedInput} from '@/shared';
import {useTranslation} from 'react-i18next';
import {findAndDeleteTime} from '../lib/findAndDeleteTime';
import {useTaskActions, useTaskToUpdateId} from '../model/hooks';
import {TASK_TITLE_LENGTH} from '../consts/titleLen';

export const TaskInputTitle: FC<{task: Task}> = ({task}) => {
  const {id, title, isTitleEditing} = task;
  const inputRef = useRef<TextInput | null>(null);
  const {t} = useTranslation();
  const {endTaskTitleEditing, setReminder, deleteTask} = useTaskActions();
  const taskToUpdateId = useTaskToUpdateId();
  const [text, setText] = useState(title);

  const onBlur = () => {
    const newTitle = text.trim();
    if (!newTitle) {
      deleteTask(id);
    } else {
      endTaskTitleEditing({id, title: newTitle});
    }
  };

  const onChangeText = (value: string) => {
    setText(value);
    const {newText, minute, hour} = findAndDeleteTime(value);
    if (hour && minute) {
      setReminder({
        id,
        time: hour + ':' + minute,
      });
      setText(newText);
    }
  };

  useEffect(() => {
    if (inputRef.current && isTitleEditing) {
      inputRef.current.focus();
    }
  }, [isTitleEditing]);

  useLayoutEffect(() => {
    if (inputRef.current && taskToUpdateId) {
      inputRef.current.blur();
    }
  }, [taskToUpdateId]);

  useEffect(() => {
    if (title && title !== text) setText(title);
  }, [title]);

  return (
    <ThemedInput
      inputRef={inputRef}
      style={styles.input}
      autoCorrect={false}
      multiline
      placeholder={t('enterText')}
      onEndEditing={onBlur}
      selectTextOnFocus={false}
      value={text}
      onChangeText={onChangeText}
      maxLength={TASK_TITLE_LENGTH}
      scrollEnabled={false}
      blurOnSubmit
    />
  );
};

const styles = StyleSheet.create({
  input: {
    ...TEXT_STYLES.standart,
    paddingRight: 15,
    paddingTop: 0,
    lineHeight: 19,
  },
});