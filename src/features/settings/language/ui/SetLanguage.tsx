import {CheckList, LANGUAGES, TLanguage, useFirebase} from '@/shared';
import {useTranslation} from 'react-i18next';

export const SetLanguage = () => {
  const {t, i18n} = useTranslation();
  const {auth} = useFirebase();

  const onPress = async (value: TLanguage) => {
    try {
      auth.setLanguageCode(value);
      i18n.changeLanguage(value);
    } catch (error) {
      console.log(error);
    }
  };

  const checkMethod = (value: TLanguage) => {
    const curr = i18n.language;
    if (curr.length > 2) {
      return curr.slice(0, 2) === value;
    }
    return value === curr;
  };

  return (
    <CheckList data={LANGUAGES} checkMethod={checkMethod} onPress={onPress} />
  );
};
