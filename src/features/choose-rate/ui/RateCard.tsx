import { Rate } from '@/entities/user';
import {
  AnimatedCheck,
  COLORS,
  CustomText,
  TEXT_STYLES,
  THEME_COLORS,
  ThemedView,
  VIEW_SHADOW,
} from '@/shared';
import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useAnimatedStyle, withTiming} from 'react-native-reanimated';

type TPropTypes = {
  data: Rate;
  isSelected: boolean;
  onPress: (id: Rate['id']) => void;
};

export const RateCard: FC<TPropTypes> = ({
  isSelected,
  onPress,
  data: {id, type, price, discount, title},
}) => {
  const {t} = useTranslation();

  const containerStyleAnim = useAnimatedStyle(() => {
    return {
      transform: [{scale: withTiming(isSelected ? 1 : 0.95)}],
      shadowOpacity: withTiming(isSelected ? 1 : VIEW_SHADOW.shadowOpacity),
    };
  }, [isSelected]);

  return (
    <Pressable onPress={() => onPress(id)}>
      <ThemedView
        animated
        colorName={'background'}
        style={[styles.container, containerStyleAnim]}
        nightStyle={styles.nightContainer}>
        {discount ? (
          <View style={styles.discountContainer}>
            <Text style={styles.discount}>-{discount}%</Text>
          </View>
        ) : (
          <View />
        )}
        <View style={styles.general}>
          <CustomText
            colorName={isSelected ? 'accent' : 'text'}
            themed
            style={styles.title}>
            {title}
          </CustomText>
          <View style={styles.priceContainer}>
            <CustomText themed style={styles.price}>
              {type === 'unlimited'
                ? t('unlimitedPrice', {price})
                : t('monthlyPrice', {price})}
            </CustomText>
            {type !== 'unlimited' && (
              <CustomText themed colorName="textGrey" style={styles.subPrice}>
                {t('yearlyPrice', {price: price * 12})}
              </CustomText>
            )}
          </View>
        </View>
        <AnimatedCheck size={22} isChecked={isSelected} greyWhenInactive />
      </ThemedView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    borderCurve: 'continuous',
    minHeight: 84,
    marginBottom: 12,
    ...VIEW_SHADOW,
  },
  nightContainer: {
    shadowColor: THEME_COLORS.night.backgroundSecond,
  },
  discount: {
    ...TEXT_STYLES.smallBold,
    color: COLORS.white,
  },
  discountContainer: {
    paddingVertical: 1,
    paddingTop: 2,
    paddingHorizontal: 3,
    backgroundColor: COLORS.green,
    borderRadius: 5,
    borderCurve: 'continuous',
    alignSelf: 'flex-start',
  },
  general: {
    alignSelf: 'center',
  },
  title: {
    ...TEXT_STYLES.standart,
    marginBottom: 5,
    textAlign: 'center',
  },
  priceContainer: {
    alignItems: 'center',
    gap: 3,
  },
  price: {
    ...TEXT_STYLES.title,
    textAlign: 'center',
  },
  subPrice: {
    ...TEXT_STYLES.smallSemibold,
  },
});
