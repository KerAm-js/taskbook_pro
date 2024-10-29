import {LanguageDetectorAsyncModule} from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeModules, Platform} from 'react-native';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const LANG_STORAGE_KEY = 'LANG';

export const LANGUAGE_DETECTOR: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (lang: string) => void) => {
    AsyncStorage.getItem(LANG_STORAGE_KEY, (err, language) => {
      if (err || !language) {
        let deviceLanguage =
          Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
              NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
            : NativeModules.I18nManager.localeIdentifier;
        callback(deviceLanguage || 'en');
        return;
      }
      callback(language);
    });
  },
  init: () => {},
  cacheUserLanguage: (language: string) => {
    AsyncStorage.setItem(LANG_STORAGE_KEY, language);
  },
};

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)

export const I18N = i18n