import {emailSvg} from '@/shared/assets/svg/email';
import {shieldSvg} from '@/shared/assets/svg/shield';
import {useHeaderHeight} from '@react-navigation/elements';
import {
  AuthStackParamsList,
  EMAIL_REGEX,
  FormButton,
  FormInput,
  IOSKeyboardFlickeringDisable,
  SCREEN_PADDING,
  ThemedView,
  useFirebase,
  useInputValidator,
  useSafeAreaPadding,
} from '@/shared';
import {Alert, Dimensions, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  SEND_EMAIL_VERIFICATION_ACTION,
  useUser,
  useUserActions,
} from '@/entities/user';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {confirmEmail} from '../api/confirmEmail.api';

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
  const {signinThunk, clearMessages} = useUserActions();
  const {loading, error, success, subscription, data} = useUser();
  const headerHeight = useHeaderHeight();
  const {paddingBottom} = useSafeAreaPadding();
  const isFocused = useIsFocused();

  const goToRegistration = () => {
    navigation.push('signup');
  };

  const onSubmit = async () => {
    signinThunk({email, password, auth});
  };

  const isFormValid = isEmailValid && isPasswordValid;

  const goToPasswordReset = () => {
    navigation.navigate('passwordReset');
  };

  useEffect(() => {
    if (data && isFocused) {
      if (!subscription.isTrialPeriodExpired && navigation.canGoBack()) {
        navigation.goBack();
      }
    }
  }, [data, isFocused]);

  useEffect(() => {
    if (error && isFocused) {
      Alert.alert(
        t(error.title),
        t(error.message),
        error.action === SEND_EMAIL_VERIFICATION_ACTION
          ? [
              {
                text: t('send'),
                style: 'default',
                onPress: () => confirmEmail(auth),
              },
              {
                text: t('cancel'),
                style: 'cancel',
              },
            ]
          : undefined,
      );
      clearMessages();
    }
  }, [error, isFocused]);

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
            keyboardType="email-address"
          />
          <IOSKeyboardFlickeringDisable />
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
        style={[styles.goToResetPassword, {paddingBottom: paddingBottom - 5}]}
        colorName="background"
        borderColorName="lineGrey">
        <FormButton
          type="secondary"
          title="forgotPassword"
          onPress={goToPasswordReset}
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
