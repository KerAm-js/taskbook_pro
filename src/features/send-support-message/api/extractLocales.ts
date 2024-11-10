import { countryEmojis, countryTitles, languageEmojis, languageTitles } from "@/shared";
import { TParamTypes } from "./types";

export const extractLanguageTitleAndEmojiFromLocale = (
  locale: TParamTypes['locale'],
) => {
  const language = locale.split(locale[2])[0] || locale.slice(0, 2);
  const languageTitle = languageTitles[language] || language;
  const languageEmoji = languageEmojis[language] || '';
  return [languageTitle, languageEmoji];
};

export const extractRegionTitleAndEmojiFromLocale = (
  locale: TParamTypes['locale'],
) => {
  const region = locale.split(locale[2])[1] || null;
  const regionTitle = !!region ? countryTitles[region] || region : '-';
  const regionEmoji = (!!region && countryEmojis[region]) || '';
  return [regionTitle, regionEmoji];
};