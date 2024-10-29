import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '../store';
import {StatusBar} from 'react-native';
import {Navigator} from './Navigator';
import {I18N, TRANSLATIONS} from '@/shared';
import {
  FirebaseContext,
  firebaseContextDefaultValue,
} from '../context/firebaseContext';

I18N.init({
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
    <FirebaseContext.Provider value={firebaseContextDefaultValue}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar barStyle={'light-content'} />
          <Navigator />
        </PersistGate>
      </Provider>
    </FirebaseContext.Provider>
  );
};
