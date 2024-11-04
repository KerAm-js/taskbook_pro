import {useUser} from '@/entities/user';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppStack} from './Navigators/AppStack';
import {AuthStack} from './Navigators/AuthStack';
import {endOfDay, RootStackParamsList, useFirebase} from '@/shared';
import {NavigationContainer} from '@react-navigation/native';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {useBackupInfo, useSettingsActions} from '@/entities/settings';
import {store} from '../store';
import {Backup} from '@/features/settings/backup';
import {useTaskActions} from '@/entities/task';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator<RootStackParamsList>();

export const Navigator = () => {
  const [loading, setLoading] = useState(true);
  const {firestore} = useFirebase();
  const {onAppLoad} = useTaskActions();
  const {email, emailVerified, uid} = useUser();
  const {setLastBackup} = useSettingsActions();
  const backupsCollection = firestore.collection('Backups');
  const {isAutoSync, lastBackup} = useBackupInfo();
  const appState = useRef(AppState.currentState);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const interval = useRef<NodeJS.Timeout | null>(null);

  const setOnDayEndHanlder = () => {
    timeout.current = setTimeout(() => {
      onAppLoad();
      interval.current = setInterval(() => {
        onAppLoad();
      }, 86400000);
    }, endOfDay() - Date.now());
  };

  const clearOnDayEndHandler = () => {
    if (timeout.current) clearTimeout(timeout.current);
    if (interval.current) clearInterval(interval.current);
  };

  useEffect(() => {
    const onAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current === 'active' &&
        nextAppState === 'inactive' &&
        isAutoSync
      ) {
        const timestamp = Date.now();
        const shouldSync = lastBackup ? timestamp - lastBackup >= 180000 : true;
        if (shouldSync) {
          const {idCounter, ids, entities, historyIds} = store.getState().tasks;
          const backup: Omit<Backup, 'currentEmail'> = {
            idCounter,
            ids,
            entities,
            historyIds,
            createdAt: Date.now(),
          };

          backupsCollection
            .doc(uid)
            .set(backup)
            .then(() => {
              setLastBackup(timestamp);
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', onAppStateChange);
    setOnDayEndHanlder();

    setTimeout(() => {
      SplashScreen.hide();
    }, 300);

    return () => {
      subscription.remove();
      clearOnDayEndHandler();
    };
  }, []);

  useLayoutEffect(() => {
    onAppLoad();
    setLoading(false);
  }, []);

  const isAuthorized = email && emailVerified;

  if (isAuthorized && loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="auth">
        {isAuthorized ? (
          <Stack.Screen name="app" component={AppStack} />
        ) : (
          <Stack.Screen name="auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
