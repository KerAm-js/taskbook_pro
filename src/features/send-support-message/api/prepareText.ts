import {Platform} from 'react-native';
import {
  extractLanguageTitleAndEmojiFromLocale,
  extractRegionTitleAndEmojiFromLocale,
} from './extractLocales';
import {TParamTypes} from './types';
import app from '../../../../app.json';

export const prepareText = ({
  userInfo,
  message,
  locale,
}: Pick<TParamTypes, 'locale' | 'message' | 'userInfo'>) => {
  const [languageTitle, languageEmoji] =
    extractLanguageTitleAndEmojiFromLocale(locale);
  const [regionTitle, regionEmoji] =
    extractRegionTitleAndEmojiFromLocale(locale);

  const userNameMarkup = `<strong>${userInfo.name}</strong>`;
  const messageMarkup = `"${message}"`;
  const lanuageMarkup = `<i>Язык</i>:           ${languageTitle} ${languageEmoji}`;
  const regionMarkup = `<i>Регион</i>:       ${regionTitle} ${regionEmoji}`;
  const appVersionMarkup = `<i>Версия</i>:       ${app.version}`;
  const osMarkup = `<i>ОС</i>:               ${Platform.OS} ${Platform.Version}`;
  const emailMarkup = `<i>Email</i>:           ${userInfo.email}`;
  const idMarkup = `<tg-spoiler>${userInfo.uid}</tg-spoiler>`;

  const text =
    userNameMarkup +
    '\n\n' +
    messageMarkup +
    '\n\n' +
    osMarkup +
    '\n' +
    lanuageMarkup +
    '\n' +
    regionMarkup +
    '\n' +
    appVersionMarkup +
    '\n' +
    emailMarkup +
    '\n\n' +
    idMarkup;

  return text;
};
