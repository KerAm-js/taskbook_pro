import {emailSvg} from '@/shared/assets/svg/email';
import {shieldSvg} from '@/shared/assets/svg/shield';
import {
  AuthStackParamsList,
  EMAIL_REGEX,
  FormButton,
  FormInput,
  SCREEN_PADDING,
  ThemedView,
  useFirebase,
  useHeaderHeight,
  useInputValidator,
  useSafeAreaPadding,
} from '@/shared';
import {useState} from 'react';
import {Alert, Dimensions, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useUserActions} from '@/entities/user';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import * as Keychain from 'react-native-keychain';

const HEIGHT = Dimensions.get('screen').height;

export const SigninForm = () => {
  const {t} = useTranslation();
  const {auth} = useFirebase();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamsList>>();
  const [email, onChangeEmail, isEmailValid, emailError] = useInputValidator({
    pattern: EMAIL_REGEX,
    patternErrorMessage: t('incorrectEmail'),
    required: true,
  });
  const [password, onChangePassword, isPasswordValid, passwordError] =
    useInputValidator({minLength: 6});
  const [loading, setLoading] = useState(false);
  const {setUser} = useUserActions();
  const headerHeight = useHeaderHeight();
  const {paddingBottom} = useSafeAreaPadding();

  const goToRegistration = () => {
    navigation.navigate('Signup');
  };

  const confirmEmail = async () => {
    auth.currentUser
      ?.sendEmailVerification()
      .then(() => {
        Alert.alert(t('emailSent'), t('followLinkWeSent'));
      })
      .catch(error => {
        if (error.code === 'auth/network-request-failed') {
          Alert.alert(t('error'), t('noInternetConnection'));
        } else {
          Alert.alert(t('error'), t('somethingWentWrong'));
        }
      });
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      if (response) {
        if (response.user.emailVerified) {
          const {uid, displayName, email, emailVerified} = response.user;
          setUser({
            uid,
            email,
            emailVerified,
            name: displayName,
          });
          await Keychain.setGenericPassword(uid, password);
        } else {
          Alert.alert(
            t('emailIsNotConfirmed'),
            t('shouldWeSendConfirmationLink'),
            [
              {
                text: t('send'),
                style: 'default',
                onPress: confirmEmail,
              },
              {
                text: t('cancel'),
                style: 'cancel',
              },
            ],
          );
        }
      }
    } catch (error: any) {
      console.log(error);
      if (error.code === 'auth/network-request-failed') {
        Alert.alert(t('error'), t('noInternetConnection'));
      } else if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/wrong-password'
      ) {
        Alert.alert(t('error'), t('wrongEmailOrPassword'));
      } else {
        Alert.alert(t('error'), t('somethingWentWrong'));
      }
    }
    setLoading(false);
  };

  const isFormValid = isEmailValid && isPasswordValid;

  const resetPassword = () => {
    navigation.navigate('PasswordReset');
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.formContainer}
        bottomOffset={20}>
        <View
          style={[
            styles.form,
            {height: HEIGHT - headerHeight, paddingBottom: headerHeight + 70},
          ]}>
          <FormInput
            placeholder="email"
            xmlGetter={emailSvg}
            value={email}
            onChangeText={onChangeEmail}
            error={emailError}
            textContentType="emailAddress"
            autoComplete="email"
          />
          <FormInput
            placeholder="password"
            xmlGetter={shieldSvg}
            value={password}
            onChangeText={onChangePassword}
            error={passwordError}
            maxLength={20}
            textContentType="password"
            autoComplete="password"
            secureTextEntry
          />
          <View style={styles.buttonsContainer}>
            <FormButton
              type="accent"
              title="signin"
              onPress={onSubmit}
              isLoading={loading}
              disabled={!isFormValid}
            />
            <FormButton
              type="secondary"
              title="registration"
              onPress={goToRegistration}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <ThemedView
        style={[styles.goToResetPassword, {paddingBottom}]}
        colorName="background"
        borderColorName="lineGrey">
        <FormButton
          type="secondary"
          title="forgotPassword"
          onPress={resetPassword}
        />
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
  },
  form: {
    paddingHorizontal: SCREEN_PADDING,
    justifyContent: 'center',
  },
  buttonsContainer: {
    marginTop: 10,
  },
  goToResetPassword: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 5,
    borderTopWidth: 1,
  },
});
