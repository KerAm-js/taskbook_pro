import {History} from '@/screens/main/history';
import {MainRoot} from '@/screens/main/Root';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppStackParamsList, CustomHeader, useThemeColors} from '@/shared';
import {Task} from '@/screens/main/Task';
import {Settings} from '@/screens/settings/Settings';
import {Subscription} from '@/screens/settings/subscription';
import {Account} from '@/screens/settings/account/Account';
import {Email} from '@/screens/settings/account/email';
import {Name} from '@/screens/settings/account/name';
import {Password} from '@/screens/settings/account/password';
import {PasswordReset} from '@/screens/auth/passwordReset';
import {Backup} from '@/screens/settings/backup';
import {Reminders} from '@/screens/settings/reminders/Reminders';
import {Count} from '@/screens/settings/reminders/count';
import {Interval} from '@/screens/settings/reminders/interval';
import {BeginningOfDay} from '@/screens/settings/reminders/beginning-of-day';
import {EndOfDay} from '@/screens/settings/reminders/end-of-day';
import {Theme} from '@/screens/settings/theme';
import {Language} from '@/screens/settings/language';

const Stack = createNativeStackNavigator<AppStackParamsList>();

export const AppStack = () => {
  const {colors} = useThemeColors();

  return (
    <Stack.Navigator initialRouteName="main">
      <Stack.Group
        screenOptions={{
          headerTitle: CustomHeader.Title,
          headerLeft: CustomHeader.BackButton,
          headerStyle: {
            backgroundColor: colors.header,
          },
        }}>
        <Stack.Screen
          name="main"
          component={MainRoot}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="task"
          component={Task}
          options={{
            presentation: 'modal',
            headerLeft: CustomHeader.CloseButton,
          }}
        />

        <Stack.Screen
          name="history"
          component={History}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>

      <Stack.Group
        navigationKey="settings"
        screenOptions={{
          headerTitle: CustomHeader.Title,
          headerLeft: CustomHeader.BackButton,
          headerStyle: {
            backgroundColor: colors.header,
          },
        }}>
        <Stack.Screen name="settings" component={Settings} />
        <Stack.Screen
          name="subscription"
          component={Subscription}
          options={{
            presentation: 'modal',
            title: 'Taskbook Pro',
            headerLeft: CustomHeader.CloseButton,
          }}
        />
        <Stack.Screen name="account" component={Account} />
        <Stack.Screen name="email" component={Email} />
        <Stack.Screen name="name" component={Name} />
        <Stack.Screen name="password" component={Password} />
        <Stack.Screen name="passwordReset" component={PasswordReset} />
        <Stack.Screen name="backup" component={Backup} />
        <Stack.Screen name="reminders" component={Reminders} />
        <Stack.Screen
          name="count"
          component={Count}
          options={{
            presentation: 'modal',
            headerLeft: CustomHeader.CloseButton,
          }}
        />
        <Stack.Screen
          name="interval"
          component={Interval}
          options={{
            presentation: 'modal',
            headerLeft: CustomHeader.CloseButton,
          }}
        />
        <Stack.Screen
          name="beginningOfDay"
          component={BeginningOfDay}
          options={{
            presentation: 'modal',
            headerLeft: CustomHeader.CloseButton,
          }}
        />
        <Stack.Screen
          name="endOfDay"
          component={EndOfDay}
          options={{
            presentation: 'modal',
            headerLeft: CustomHeader.CloseButton,
          }}
        />
        <Stack.Screen
          name="theme"
          component={Theme}
          options={{
            headerTransparent: true,
            headerStyle: {backgroundColor: 'rgba(0, 0, 0, 0)'},
            presentation: 'modal',
            headerLeft: CustomHeader.CloseButton,
          }}
        />
        <Stack.Screen
          name="language"
          component={Language}
          options={{
            presentation: 'modal',
            headerLeft: CustomHeader.CloseButton,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
