//ui
export {Setting} from './ui/Setting';
export {Header} from './ui/Header';
export {ThemedGradient} from './ui/Theme';
export {ThemedText} from './ui/Theme';
export {ThemedInput} from './ui/Theme';
export {ThemedView} from './ui/Theme';
export {ThemedIcon} from './ui/Theme';
export {ThemedPressable} from './ui/Theme';
export {AnimatedCheck} from './ui/AnimatedCheck';
export {IconButton} from './ui/IconButton';
export {CustomText} from './ui/CustomText';
export {CheckList} from './ui/CheckList';
export {FormInput} from './ui/FormInput';
export {InputComment} from './ui/InputComment';
export {TimePopup} from './ui/Popups';
export {CalendarPopup} from './ui/Popups';
export {FormButton} from './ui/FormButton';

//config
export {LANGUAGE_DETECTOR} from './config/i18n/i18n';
export {TRANSLATIONS} from './config/i18n/translations';
export {LANGUAGES} from './config/i18n/translations';
export {
  THEME_COLORS,
  COLORS,
  THEME_ICON_GRADIENTS,
} from './config/style/colors';
export {SCREEN_PADDING, PADDING_TOP} from './config/style/views';
export {
  HEADER_SHADOW,
  HEADER_SHADOW_NIGHT,
  VIEW_SHADOW,
  VIEW_SHADOW_REVERSE,
} from './config/style/shadows';
export {TEXT_STYLES} from './config/style/texts';
export {WEEK_DAYS} from './consts/datetime';
export {TIME_REGEX, EMAIL_REGEX} from './consts/regex';

//hooks
export {useSafeAreaPadding} from './hooks/useSafeAreaPadding';
export {useKeyboard} from './hooks/useKeyboard';
export {useInputValidator} from './hooks/useInputValidator';
export {
  useThemeColors,
  useAnimatedThemeStyle,
  useTheme,
} from './hooks/useTheme';
export {useHeaderHeight} from './hooks/useHeaderHeight';

//lib
export {
  isDatesEqual,
  getCalendarWeeks,
  isToday,
  isTomorrow,
  isYesterday,
  isCurrentYear,
  endOfDay,
  getNextDate,
  getDate,
  getMonth,
  getYear,
  getDateTitle,
  getCalendarMonths,
} from './lib/dates';
export {getTimeString, getTime} from './lib/time';
export {
  setNotification,
  deleteNotification,
  deleteAllNotifications,
} from './lib/notifications';
export {getTimeValueFromString} from './lib/time';

//types
export type {TLanguage} from './config/i18n/translations';
export type {TColorName, TTheme} from '@/shared/config/style/colors';
export type {TSetNotificationArg} from './lib/notifications';
export type {TTimeValue} from './lib/time';
export type {CheckListValue} from './ui/CheckList';
export type {TCalendarWeek} from './lib/dates';
export type {
  RootStackParamsList,
  AuthStackParamsList,
  AppStackParamsList,
  SettingsStackParamsList,
  AccountSettingsStackParamsList,
  PasswordStackParamsList,
  ReminderSettingsStackParamsList,
} from './config/navigation/navigation.types';
