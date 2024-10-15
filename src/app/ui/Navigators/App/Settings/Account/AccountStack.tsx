import {PasswordReset} from '@/screens/auth/passwordReset';
import {Email} from '@/screens/settings/account/email';
import {Name} from '@/screens/settings/account/name';
import {Password} from '@/screens/settings/account/password';
import {AccountRoot} from '@/screens/settings/account/Root';
import {AccountSettingsStackParamsList} from '@/shared';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PasswordStack} from './Password/PasswordStack';

const Stack = createNativeStackNavigator<AccountSettingsStackParamsList>();

export const AccountStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Root">
      <Stack.Screen name="Root" component={AccountRoot} />
      <Stack.Screen
        name="Email"
        component={Email}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="Name"
        component={Name}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="Password"
        component={PasswordStack}
        options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};
