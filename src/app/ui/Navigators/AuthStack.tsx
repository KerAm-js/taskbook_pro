import {PasswordReset} from '@/screens/auth/passwordReset';
import {Signin} from '@/screens/auth/signin';
import {Signup} from '@/screens/auth/signup';
import {AuthStackParamsList} from '@/shared';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<AuthStackParamsList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="signin" component={Signin} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="passwordReset" component={PasswordReset} />
    </Stack.Navigator>
  );
};
