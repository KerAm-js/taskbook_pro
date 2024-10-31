import {closeCalendarSvg} from '@/shared/assets/svg/closeCalendar';
import {openCalendarSvg} from '@/shared/assets/svg/openCalendar';
import {settingsSvg} from '@/shared/assets/svg/settings';
import {taskHistorySvg} from '@/shared/assets/svg/taskHistory';
import {AppStackParamsList, COLORS, IconButton, SCREEN_PADDING} from '@/shared';
import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const iconSize = 26;

const NavBar: FC<{
  isCalendarOpened: boolean;
  toggleCalendarOpened: () => void;
}> = ({isCalendarOpened, toggleCalendarOpened}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();
  return (
    <View style={[styles.navBar]}>
      <IconButton
        xmlGetter={settingsSvg}
        staticColor={COLORS.white}
        onPress={() => navigation.navigate('settings')}
        width={iconSize}
        height={iconSize}
      />
      <View style={styles.navBarRight}>
        <IconButton
          xmlGetter={taskHistorySvg}
          staticColor={COLORS.white}
          onPress={() => navigation.navigate('history')}
          width={iconSize}
          height={iconSize}
        />
        <IconButton
          xmlGetter={isCalendarOpened ? closeCalendarSvg : openCalendarSvg}
          staticColor={COLORS.white}
          onPress={toggleCalendarOpened}
          width={iconSize}
          height={iconSize}
        />
      </View>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  navBar: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingHorizontal: SCREEN_PADDING - (40 - 24) / 2,
  },
  navBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
