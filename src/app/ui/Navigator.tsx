import {useUser, useUserActions} from '@/entities/user';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppStack} from './Navigators/AppStack';
import {AuthStack} from './Navigators/AuthStack';
import {endOfDay, RootStackParamsList, useFirebase} from '@/shared';
import {NavigationContainer} from '@react-navigation/native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {useBackupInfo, useSettingsActions} from '@/entities/settings';
import {store} from '../store';
import {Backup} from '@/features/settings/backup';
import {useTaskActions} from '@/entities/task';
import SplashScreen from 'react-native-splash-screen';
import {TRIAL_PERIOD_IN_MILLIS_SECONDS} from '../config/consts';

const Stack = createNativeStackNavigator<RootStackParamsList>();

export const Navigator = () => {
  const [loading, setLoading] = useState(true);
  const {firestore} = useFirebase();
  const {data: user, subscription} = useUser();
  const {onAppLoad} = useTaskActions();
  const {endTrialPeriod} = useUserActions();
  const {setLastBackup} = useSettingsActions();
  const {isAutoSync, lastBackup} = useBackupInfo();
  const backupsCollection = firestore.collection('Backups');
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

  const checkTrialPeriod = () => {
    if (!subscription.isTrialPeriodExpired) {
      const timeUntilTrialPeriodEnd =
        Date.now() - subscription.trialPeriodStartDate;
      if (timeUntilTrialPeriodEnd <= TRIAL_PERIOD_IN_MILLIS_SECONDS) {
        endTrialPeriod();
      } else {
        setTimeout(() => {
          endTrialPeriod();
        }, timeUntilTrialPeriodEnd);
      }
    }
  };

  const onAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      user &&
      appState.current === 'active' &&
      nextAppState === 'inactive' &&
      isAutoSync
    ) {
      const timestamp = Date.now();
      const shouldSync = lastBackup ? timestamp - lastBackup >= 60000 : true;
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
          .doc(user.uid)
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

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => {
      subscription.remove();
    };
  }, [user, isAutoSync]);

  useEffect(() => {
    setOnDayEndHanlder();
    onAppLoad();
    checkTrialPeriod();
    setLoading(false);

    return () => {
      clearOnDayEndHandler();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 200);
    }
  }, [loading]);

  const isAuthorized = user?.email && user?.emailVerified;

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="auth">
        {isAuthorized || !subscription.isTrialPeriodExpired ? (
          <Stack.Screen name="app" component={AppStack} />
        ) : (
          <Stack.Screen name="auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
