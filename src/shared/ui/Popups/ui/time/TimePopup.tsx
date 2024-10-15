import {StyleSheet, View} from 'react-native';
import {FC, useRef} from 'react';
import {TEXT_STYLES} from '@/shared/config/style/texts';
import {ThemedText} from '@/shared/ui/Theme/ui/ThemedText';
import {ThemedView} from '@/shared/ui/Theme/ui/ThemedView';
import {hours, minutes} from './Item';
import {Picker} from './Picker';
import {Popup, TPopupPropTypes} from '../hoc/Popup';
import {TTimeValue} from '@/shared/lib/time';

type TPropTypes = {
  onSubmit: (value: TTimeValue) => void;
  onDelete?: () => void;
  value: TTimeValue;
  hide: TPopupPropTypes['hide'];
};

export const TimePopup: FC<TPropTypes> = ({
  onSubmit,
  onDelete,
  value,
  hide,
}) => {
  const minuteIndex = Math.ceil(value.minute / 5);
  const minuteInitIndex = minuteIndex === minutes.length ? 0 : minuteIndex;

  const hourIndex = minuteInitIndex === 0 ? value.hour + 1 : value.hour;
  const hourInitIndex = hourIndex === hours.length ? 0 : hourIndex;

  const hour = useRef(Number(hours[hourInitIndex]));
  const minute = useRef(Number(minutes[minuteInitIndex]));

  const onUpdateHour = (value: number) => (hour.current = value);
  const onUpdateMinute = (value: number) => (minute.current = value);

  const onSubmitHandler = () => {
    onSubmit({hour: hour.current, minute: minute.current});
  };

  return (
    <Popup
      title="reminder"
      onSubmit={onSubmitHandler}
      hide={hide}
      onDestructive={onDelete}
      destructiveTitle={onDelete && 'delete'}>
      <ThemedView colorName="background" style={styles.container}>
        <Picker
          onChange={onUpdateHour}
          initIndex={hourInitIndex}
          data={hours}
          side="left"
        />
        <Picker
          onChange={onUpdateMinute}
          initIndex={minuteInitIndex}
          data={minutes}
          side="right"
        />
        <View style={styles.maskViewContainer}>
          <ThemedView style={styles.maskView} colorName="backgroundSecond">
            <ThemedText style={styles.points}>:</ThemedText>
          </ThemedView>
        </View>
      </ThemedView>
    </Popup>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 190,
    height: 185,
  },
  points: {
    ...TEXT_STYLES.standart,
    fontSize: 23,
    lineHeight: undefined,
    marginBottom: 2,
  },
  maskViewContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    zIndex: -1,
  },
  maskView: {
    height: 37,
    borderRadius: 9,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
