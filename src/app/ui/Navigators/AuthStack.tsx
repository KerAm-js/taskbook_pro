import {PasswordReset} from '@/screens/auth/passwordReset';
import {Signin} from '@/screens/auth/signin';
import {Signup} from '@/screens/auth/signup';
import {AuthStackParamsList, CustomHeader, useThemeColors} from '@/shared';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<AuthStackParamsList>();

export const AuthStack = () => {
  const {colors} = useThemeColors();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: CustomHeader.Title,
        headerLeft: CustomHeader.BackButton,
        headerStyle: {
          backgroundColor: colors.header,
        },
      }}>
      <Stack.Screen name="signin" component={Signin} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="passwordReset" component={PasswordReset} />
    </Stack.Navigator>
  );
};
