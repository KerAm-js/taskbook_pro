import {PasswordReset} from '@/screens/auth/passwordReset';
import {Password} from '@/screens/settings/account/password';
import {PasswordStackParamsList} from '@/shared';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<PasswordStackParamsList>();

export const PasswordStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Root">
      <Stack.Screen name="Root" component={Password} />
      <Stack.Screen
        name="PasswordReset"
        component={PasswordReset}
        options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};
