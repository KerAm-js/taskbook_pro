import {widgetSvg} from '@/shared/assets/svg/widget';
import {useTaskActions} from '@/entities/task';
import {AppStackParamsList, IconButton} from '@/shared';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const OpenTaskForm = () => {
  const {continueTaskEditingWithTaskForm} = useTaskActions();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();

  const onPress = () => {
    continueTaskEditingWithTaskForm();
    navigation.navigate('Task');
  };
  
  return (
    <IconButton
      xmlGetter={widgetSvg}
      colorName="accent"
      onPress={onPress}
      width={24}
      height={24}
    />
  );
};
