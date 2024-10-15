import { CheckList, LANGUAGES, TLanguage } from "@/shared";
import { useTranslation } from "react-i18next";
import auth from "@react-native-firebase/auth";

export const SetLanguage = () => {
  const { t, i18n } = useTranslation();

  const onPress = async (value: TLanguage) => {
    auth().setLanguageCode(value);
    i18n.changeLanguage(value);
  };

  const checkMethod = (value: TLanguage) => value === i18n.language;

  return (
    <CheckList data={LANGUAGES} checkMethod={checkMethod} onPress={onPress} />
  );
};
