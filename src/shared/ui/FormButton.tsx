import {FC} from 'react';
import {PressableProps, StyleSheet} from 'react-native';
import {ThemedActivityIndicator, ThemedPressable} from './Theme';
import {CustomText} from './CustomText';
import {TEXT_STYLES} from '../config/style/texts';

type TPropTypes = {
  title: string;
  type: 'accent' | 'secondary' | 'destructive';
  onPress: () => void;
  disabled?: PressableProps['disabled'];
  isLoading?: boolean;
};

export const FormButton: FC<TPropTypes> = ({
  title,
  onPress,
  disabled,
  type,
  isLoading,
}) => {
  const colorName = disabled
    ? 'textGrey'
    : type === 'destructive'
    ? 'destructive'
    : 'accent';
  const backgroundColorName =
    type === 'accent'
      ? disabled
        ? 'lineGrey'
        : 'accent_ultra_opacity'
      : 'background';

  return (
    <ThemedPressable
      colorName={backgroundColorName}
      onPress={onPress}
      style={styles.container}
      disabled={disabled || isLoading}>
      {isLoading ? (
        <ThemedActivityIndicator colorName={colorName} />
      ) : (
        <CustomText themed colorName={colorName} style={styles.title}>
          {title}
        </CustomText>
      )}
    </ThemedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
    borderRadius: 12,
    borderCurve: 'continuous',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    ...TEXT_STYLES.standartSemibold,
  },
});
