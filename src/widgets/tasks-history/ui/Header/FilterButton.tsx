import {COLORS, CustomText, TEXT_STYLES} from '@/shared';
import {FC} from 'react';
import {Pressable, StyleSheet} from 'react-native';

type TPropTypes = {
  isActive: boolean;
  title: string;
  type: string;
  select: (type: string) => void;
};

export const FilterButton: FC<TPropTypes> = ({
  isActive,
  title,
  type,
  select,
}) => {
  const onPress = () => select(type);
  return (
    <Pressable
      onPress={onPress}
      hitSlop={{ top: 6, bottom: 6 }}
      style={[
        styles.container,
        isActive && {backgroundColor: COLORS.whiteOpacity},
      ]}>
      <CustomText
        style={[
          styles.title,
          TEXT_STYLES[isActive ? 'standartBold' : 'standart'],
        ]}>
        {title}
      </CustomText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 28,
    paddingTop: 4,
    paddingBottom: 3,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderCurve: 'continuous',
  },
  title: {
    color: COLORS.white,
  },
});
