import {User} from '@/entities/user';
import {
  countryEmojis,
  countryTitles,
  languageEmojis,
  languageTitles,
} from '@/shared';
import {Platform} from 'react-native';
import app from '../../../app.json';

const CHAT_ID = '-1002249594536';
const PROBLEMS_THREAD_ID = 3;
const IDEAS_THREAD_ID = 2;

const TOKEN = '8139472485:AAFv8z9oiBLIoQ6-jl7YM_RArRJSfFsKi4c';
const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

const PARSE_MODE = 'html';

type TParamTypes = {
  userInfo: User;
  message: string;
  thread: 'problems' | 'ideas';
  locale: string;
};

const extractLanguageTitleAndEmojiFromLocale = (
  locale: TParamTypes['locale'],
) => {
  const language = locale.split(locale[2])[0] || locale.slice(0, 2);
  const languageTitle = languageTitles[language] || language;
  const languageEmoji = languageEmojis[language] || '';
  return [languageTitle, languageEmoji];
};

const extractRegionTitleAndEmojiFromLocale = (
  locale: TParamTypes['locale'],
) => {
  const region = locale.split(locale[2])[1] || null;
  const regionTitle = !!region ? countryTitles[region] || region : '-';
  const regionEmoji = (!!region && countryEmojis[region]) || '-';
  return [regionTitle, regionEmoji];
};

const prepareText = ({
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
  const osMarkup = `<i>ПО</i>:               ${Platform.OS} ${Platform.Version}`;
  const emailMarkup = `<i>Email</i>:           ${userInfo.email}`;
  const idMarkup = `<tg-spoiler>${userInfo.uid}</tg-spoiler>`;

  const text =
    userNameMarkup +
    '\n\n' +
    messageMarkup +
    '\n\n' +
    lanuageMarkup +
    '\n' +
    regionMarkup +
    '\n' +
    appVersionMarkup +
    '\n' +
    osMarkup +
    '\n' +
    emailMarkup +
    '\n\n' +
    idMarkup;

  return text;
};

export const sendMessage = async ({
  userInfo,
  message,
  thread,
  locale,
}: TParamTypes) => {
  try {
    const text = prepareText({userInfo, locale, message});

    const message_thread_id =
      thread === 'problems' ? PROBLEMS_THREAD_ID : IDEAS_THREAD_ID;

    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        parse_mode: PARSE_MODE,
        message_thread_id,
        text,
      }),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(JSON.stringify(result));
    }
  } catch (error) {
    console.log(error);
  }
};
