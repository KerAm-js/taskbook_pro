import {useUser} from '@/entities/user';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppStack} from './Navigators/AppStack';
import {AuthStack} from './Navigators/AuthStack';
import {endOfDay, RootStackParamsList} from '@/shared';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {useTaskActions} from '@/entities/task';
import SplashScreen from 'react-native-splash-screen';
import {useAutoSyncCallback} from '../api/useAutoSyncCallback.api';
import {useBackupInfo} from '@/entities/settings';
import {useCheckTrialPeriodCallback} from '../model/useCheckTrialPeriodCallback';
import {useLogScreenChangeCallback} from '../api/useLogScreenChangeCallback';

const Stack = createNativeStackNavigator<RootStackParamsList>();

export const Navigator = () => {
  const routeNameRef = useRef<string | undefined>();
  const navigationRef =
    useRef<NavigationContainerRef<RootStackParamsList> | null>(null);
  const [loading, setLoading] = useState(true);
  const {data: user, subscription} = useUser();
  const {onAppLoad} = useTaskActions();
  const backupInfo = useBackupInfo();
  const appState = useRef(AppState.currentState);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const interval = useRef<NodeJS.Timeout | null>(null);

  const autoSyncCallback = useAutoSyncCallback(backupInfo);
  const checkTrialPeriodCallback = useCheckTrialPeriodCallback(subscription);
  const {setFirstScreen, logScreenChange} =
    useLogScreenChangeCallback(navigationRef);

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

  const onAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.current === 'active' && nextAppState === 'inactive') {
      autoSyncCallback();
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => {
      subscription.remove();
    };
  }, [user, backupInfo.isAutoSync]);

  useEffect(() => {
    setOnDayEndHanlder();
    onAppLoad();
    checkTrialPeriodCallback();
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
    <NavigationContainer
      ref={navigationRef}
      onReady={setFirstScreen}
      onStateChange={logScreenChange}>
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
