import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '../store';
import {StatusBar} from 'react-native';
import {Navigator} from './Navigator';
import i18n from 'i18next';
import {LANGUAGE_DETECTOR, TRANSLATIONS} from '@/shared';
import {initReactI18next} from 'react-i18next';

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: TRANSLATIONS,
    fallbackLng: 'en',
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle={'light-content'} />
        <Navigator />
      </PersistGate>
    </Provider>
  );
};
