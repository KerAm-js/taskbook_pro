import {useDailyReminder, useTaskReminderSettings} from '@/entities/task';
import {
  AppStackParamsList,
  CustomText,
  getTimeString,
  PADDING_TOP,
  SCREEN_PADDING,
  Setting,
  TEXT_STYLES,
} from '@/shared';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';

export const ReminderSettings = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();
  const {count, interval} = useTaskReminderSettings();
  const {beginning, end} = useDailyReminder();

  const beginningOfDayStr = getTimeString(beginning) || t('off');
  const endOfDayStr = getTimeString(end) || t('off');

  const intervalStr =
    count === 1
      ? t('off')
      : t(interval >= 60 ? 'hour' : 'min', {
          count: interval >= 60 ? interval / 60 : interval,
        });

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      <CustomText themed style={styles.title}>
        tasks
      </CustomText>
      <Setting
        type="value"
        onPress={() => navigation.navigate('count')}
        value={count}
        title="count"
      />
      <Setting
        type="value"
        onPress={() => navigation.navigate('interval')}
        value={intervalStr}
        disabled={count === 1}
        title="interval"
      />
      <CustomText themed style={styles.title}>
        daily
      </CustomText>
      <Setting
        type="value"
        onPress={() => navigation.navigate('beginningOfDay')}
        value={beginningOfDayStr}
        title="beginningOfDay"
      />
      <CustomText themed colorName="textGrey" style={styles.message}>
        messageBeginningOfDay
      </CustomText>
      <Setting
        type="value"
        onPress={() => navigation.navigate('endOfDay')}
        value={endOfDayStr}
        title="endOfDay"
      />
      <CustomText themed colorName="textGrey" style={styles.message}>
        messageEndOfDay
      </CustomText>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    paddingTop: PADDING_TOP - 15,
    paddingHorizontal: SCREEN_PADDING,
  },
  contentContainer: {
    paddingBottom: 200,
  },
  title: {
    marginVertical: 15,
    ...TEXT_STYLES.title,
  },
  message: {
    ...TEXT_STYLES.small,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
});
