import {useUser} from '@/entities/user';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStack} from './Navigators/AuthStack';
import {AppStack} from './Navigators/App/AppStack';
import {RootStackParamsList} from '@/shared';
import {NavigationContainer} from '@react-navigation/native';
import {useEffect, useRef} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {useBackupInfo, useSettingsActions} from '@/entities/settings';
import firestore from '@react-native-firebase/firestore';
import {store} from '../store';
import {Backup} from '@/features/settings/backup';

const Stack = createNativeStackNavigator<RootStackParamsList>();

export const Navigator = () => {
  const {email, emailVerified, uid} = useUser();
  const {setLastBackup} = useSettingsActions();
  const backupsCollection = firestore().collection('Backups');
  const {isAutoSync, lastBackup} = useBackupInfo();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const onAppStateChange = async (nextAppState: AppStateStatus) => {
      if (appState.current === 'active' && 'inactive' && isAutoSync) {
        const timestamp = Date.now();
        const shouldSync = lastBackup ? timestamp - lastBackup >= 180000 : true;

        if (shouldSync) {
          const {idCounter, ids, entities} = store.getState().tasks;
          const backup: Omit<Backup, 'currentEmail'> = {
            idCounter,
            ids,
            entities,
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

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Auth">
        {email && emailVerified ? (
          <Stack.Screen name="App" component={AppStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
