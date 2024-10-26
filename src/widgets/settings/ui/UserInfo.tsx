import {useUser} from '@/entities/user';
import {
  SCREEN_PADDING,
  TEXT_STYLES,
  ThemedIcon,
  ThemedPressable,
  ThemedText,
  ThemedView,
} from '@/shared';
import {penFillSvg} from '@/shared/assets/svg/penFill';
import {FC} from 'react';
import {StyleSheet, View} from 'react-native';

type TPropTypes = {
  onPress: () => void;
};

export const UserInfo: FC<TPropTypes> = ({onPress}) => {
  const {email, name} = useUser();
  return (
    <ThemedView
      colorName="background"
      borderColorName="lineGrey"
      style={styles.container}>
      <View>
        <ThemedText style={styles.name}>{name}</ThemedText>
        <ThemedText colorName="textGrey" style={styles.email}>
          {email}
        </ThemedText>
      </View>
      <ThemedPressable
        style={styles.button}
        colorName="accent_ultra_opacity"
        onPress={onPress}
        hitSlop={10}>
        <ThemedIcon
          colorName="accent"
          width={16}
          height={16}
          xmlGetter={penFillSvg}
        />
      </ThemedPressable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    marginBottom: 8,
    borderBottomWidth: 1,
    paddingHorizontal: SCREEN_PADDING,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    ...TEXT_STYLES.titleBig,
    marginBottom: 3,
  },
  email: {
    ...TEXT_STYLES.small,
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});
