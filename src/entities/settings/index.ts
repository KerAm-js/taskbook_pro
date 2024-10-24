export { updateDailyNotification, deleteDailyNotification } from "./lib/updateDailyNotifications";
export {
  useSettingsActions,
  useSettings,
  useFastInputMode,
  useDailyReminder,
  useBackupInfo,
} from "./model/hooks";
export { settingsSlice } from "./model/settingsSlice";
export type { ISettingsState } from "./model/types";
