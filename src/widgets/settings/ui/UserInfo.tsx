import {useUser} from '@/entities/user';
import {
  AppStackParamsList,
  SCREEN_PADDING,
  TEXT_STYLES,
  ThemedIcon,
  ThemedPressable,
  ThemedText,
  ThemedView,
} from '@/shared';
import {penFillSvg} from '@/shared/assets/svg/penFill';
import {userPlusFilledSvg} from '@/shared/assets/svg/userPlusFilled';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';

export const UserInfo: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();
  const {t} = useTranslation();
  const {data: user} = useUser();

  const isUserAuthorized = user?.email && user?.emailVerified;
  const title = isUserAuthorized ? user.name : '#' + t('guest');
  const subTitle = isUserAuthorized ? user.email : t('youDontHaveAccount');

  const goToAccount = () => {
    navigation.navigate('account');
  };

  const goSignIn = () => {
    navigation.navigate('signin');
  };

  return (
    <ThemedView
      colorName="background"
      borderColorName="lineGrey"
      style={styles.container}>
      <View>
        <ThemedText style={styles.name}>{title}</ThemedText>
        <ThemedText colorName="textGrey" style={styles.email}>
          {subTitle}
        </ThemedText>
      </View>
      <ThemedPressable
        style={styles.button}
        colorName="accent_ultra_opacity"
        onPress={isUserAuthorized ? goToAccount : goSignIn}
        hitSlop={10}>
        {isUserAuthorized ? (
          <ThemedIcon
            colorName="accent"
            width={16}
            height={16}
            xmlGetter={penFillSvg}
          />
        ) : (
          <ThemedIcon colorName="accent" xmlGetter={userPlusFilledSvg} />
        )}
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
