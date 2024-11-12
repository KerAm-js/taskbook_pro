import {RootStackParamsList} from '@/shared';
import {NavigationContainerRef} from '@react-navigation/native';
import {MutableRefObject, useEffect, useRef} from 'react';
import analytics from '@react-native-firebase/analytics';

export const useLogScreenChangeCallback = (
  navigationRef: MutableRefObject<NavigationContainerRef<RootStackParamsList> | null>,
) => {
  const routeNameRef = useRef<string | undefined>();

  const setFirstScreen = () => {
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
  };

  const logScreenChange = async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
    try {
      if (previousRouteName !== currentRouteName) {
        await analytics().logScreenView({
          screen_name: currentRouteName,
          screen_class: currentRouteName,
        });
      }
    } catch (error) {
      console.log(error);
    }
    routeNameRef.current = currentRouteName;
  };

  return {setFirstScreen, logScreenChange};
};
