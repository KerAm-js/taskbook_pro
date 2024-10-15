import {Backup} from '@/screens/settings/backup';
import {SettingsRoot} from '@/screens/settings/Root';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AccountStack} from './Account/AccountStack';
import {RemindersStack} from './Reminders/RemindersStack';
import {Theme} from '@/screens/settings/theme';
import {Language} from '@/screens/settings/language';
import {SettingsStackParamsList} from '@/shared';
import {Subscription} from '@/screens/settings/subscription';

const Stack = createNativeStackNavigator<SettingsStackParamsList>();

export const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Root">
      <Stack.Screen name="Root" component={SettingsRoot} />
      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen name="Account" component={AccountStack} />
      <Stack.Screen name="Backup" component={Backup} />
      <Stack.Screen name="Reminders" component={RemindersStack} />
      <Stack.Screen name="Theme" component={Theme} />
      <Stack.Screen
        name="Language"
        component={Language}
        options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};
