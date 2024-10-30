import {History} from '@/screens/main/history';
import {MainRoot} from '@/screens/main/Root';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppStackParamsList} from '@/shared';
import {Task} from '@/screens/main/Task';
import {Settings} from '@/screens/settings/Settings';
import {Subscription} from '@/screens/settings/subscription';
import {Account} from '@/screens/settings/account/Account';
import {Email} from '@/screens/settings/account/email';
import {Name} from '@/screens/settings/account/name';
import {Password} from '@/screens/settings/account/password';
import {PasswordReset} from '@/screens/auth/passwordReset';
import {Backup} from '@/screens/settings/backup';
import { Reminders } from '@/screens/settings/reminders/Reminders';
import { Count } from '@/screens/settings/reminders/count';
import { Interval } from '@/screens/settings/reminders/interval';
import { BeginningOfDay } from '@/screens/settings/reminders/beginning-of-day';
import { EndOfDay } from '@/screens/settings/reminders/end-of-day';
import { Theme } from '@/screens/settings/theme';
import { Language } from '@/screens/settings/language';

const Stack = createNativeStackNavigator<AppStackParamsList>();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Main">

      <Stack.Screen name="Main" component={MainRoot} />

      <Stack.Screen
        name="Task"
        component={Task}
        options={{presentation: 'modal'}}
      />

      <Stack.Screen name="History" component={History} />

      <Stack.Group navigationKey='settings'>
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen
          name="Subscription"
          component={Subscription}
          options={{presentation: 'modal'}}
        />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Email" component={Email} />
        <Stack.Screen name="Name" component={Name} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="PasswordReset" component={PasswordReset} />
        <Stack.Screen name="Backup" component={Backup} />
        <Stack.Screen name="Reminders" component={Reminders} />
        <Stack.Screen
          name="Count"
          component={Count}
          options={{presentation: 'modal'}}
        />
        <Stack.Screen
          name="Interval"
          component={Interval}
          options={{presentation: 'modal'}}
        />
        <Stack.Screen
          name="BeginningOfDay"
          component={BeginningOfDay}
          options={{presentation: 'modal'}}
        />
        <Stack.Screen
          name="EndOfDay"
          component={EndOfDay}
          options={{presentation: 'modal'}}
        />
        <Stack.Screen name="Theme" component={Theme} />
        <Stack.Screen
          name="Language"
          component={Language}
          options={{presentation: 'modal'}}
        />
      </Stack.Group>

    </Stack.Navigator>
  );
};
