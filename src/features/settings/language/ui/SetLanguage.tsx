import {CheckList, LANGUAGES, TLanguage} from '@/shared';
import {useTranslation} from 'react-i18next';
import auth from '@react-native-firebase/auth';

export const SetLanguage = () => {
  const {t, i18n} = useTranslation();

  const onPress = async (value: TLanguage) => {
    auth().setLanguageCode(value);
    i18n.changeLanguage(value);
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
