import {History} from '@/screens/main/history';
import {MainRoot} from '@/screens/main/Root';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SettingsStack} from './Settings/SettingsStack';
import {AppStackParamsList} from '@/shared';
import { Task } from '@/screens/main/Task';

const Stack = createNativeStackNavigator<AppStackParamsList>();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Root">
      <Stack.Screen name="Root" component={MainRoot} />
      <Stack.Screen name="Task" component={Task} options={{ presentation: 'modal' }} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Settings" component={SettingsStack} />
    </Stack.Navigator>
  );
};
