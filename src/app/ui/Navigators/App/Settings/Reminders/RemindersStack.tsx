import {BeginningOfDay} from '@/screens/settings/reminders/beginning-of-day';
import {Count} from '@/screens/settings/reminders/count';
import {EndOfDay} from '@/screens/settings/reminders/end-of-day';
import {Interval} from '@/screens/settings/reminders/interval';
import {RemindersRoot} from '@/screens/settings/reminders/Root';
import {ReminderSettingsStackParamsList} from '@/shared';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<ReminderSettingsStackParamsList>();

export const RemindersStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Root">
      <Stack.Screen name="Root" component={RemindersRoot} />
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
    </Stack.Navigator>
  );
};
