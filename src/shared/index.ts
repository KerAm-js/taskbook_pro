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
export {IOSKeyboardFlickeringDisable} from './ui/IOSKeyboardFlickeringDisable';

//config
export {LANGUAGE_DETECTOR, I18N} from './config/i18n/i18n';
export {TRANSLATIONS, LANGUAGES} from './config/i18n/translations';
export {
  THEME_COLORS,
  COLORS,
  THEME_ICON_GRADIENTS,
} from './config/style/colors';
export {
  SCREEN_PADDING,
  PADDING_TOP,
  HEADER_CONTENT_HEIGHT,
} from './config/style/views';
export {
  HEADER_SHADOW,
  HEADER_SHADOW_NIGHT,
  VIEW_SHADOW,
  VIEW_SHADOW_REVERSE,
} from './config/style/shadows';
export {TEXT_STYLES} from './config/style/texts';
export {WEEK_DAYS} from './config/consts/datetime';
export {TIME_REGEX, EMAIL_REGEX} from './config/consts/regex';
export {USER_UPDATES_PERIOD} from './config/consts/api';

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
export {useFirebase} from './api/useFirebase';

//lib
export {
  isDatesEqual,
  getCalendarWeeks,
  isToday,
  getWeekDay,
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
export {autoAuth} from './api/autoAuth';
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
} from './config/navigation/navigation.types';
