import {FC} from 'react';
import {CustomText} from './CustomText';
import {StyleSheet} from 'react-native';
import {TEXT_STYLES} from '../config/style/texts';
import {COLORS} from '../config/style/colors';

type TPropTypes = {
  children: string;
};

export const HeaderTitle: FC<TPropTypes> = ({children}) => {
  return <CustomText style={styles.title}>{children}</CustomText>;
};

const styles = StyleSheet.create({
  title: {
    ...TEXT_STYLES.standartSemibold,
    letterSpacing: 0.5,
    color: COLORS.white,
  },
});
