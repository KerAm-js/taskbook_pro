import {emailSvg} from '@/shared/assets/svg/email';
import {checkCanUpdate, TUserUpdates, useUser} from '@/entities/user';
import {
  EMAIL_REGEX,
  FormButton,
  FormInput,
  InputComment,
  PADDING_TOP,
  SCREEN_PADDING,
  useFirebase,
  useInputValidator,
} from '@/shared';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const ResetPasswordForm = () => {
  const {t} = useTranslation();
  const {auth, firestore} = useFirebase();
  const passwordResetsCollection = firestore.collection('PasswordResets');
  const navigation = useNavigation();
  const user = useUser();
  const [email, onChangeEmail, isEmailValid, emailError] = useInputValidator({
    pattern: EMAIL_REGEX,
    patternErrorMessage: t('incorrectEmail'),
    required: true,
    initValue: user.email,
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      if (!user.email) return;
      const response = await passwordResetsCollection.doc(user.uid).get();
      const passwordResettedAt = response.data() as TUserUpdates;
      const canUpdate = checkCanUpdate(passwordResettedAt);
      if (canUpdate) {
        await auth.sendPasswordResetEmail(email);
        Alert.alert(t('emailSent'), t('followLinkWeSent'), [
          {
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert(t('error'), t('passwordResettingPeriodComment'));
      }
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert(t('error'), t('emailAlreadyInUse'));
      } else if (error.code === 'auth/network-request-failed') {
        Alert.alert(t('error'), t('noInternetConnection'));
      } else {
        Alert.alert(t('error'), t('somethingWentWrong'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      <View style={styles.inputs}>
        <InputComment>{t('passwordResetLinkWillBeSent')}</InputComment>
        <FormInput
          xmlGetter={emailSvg}
          placeholder="email"
          value={email}
          onChangeText={onChangeEmail}
          error={emailError}
          textContentType="emailAddress"
          editable={!(user.uid && user.email)}
        />
        <InputComment>{t('passwordResettingPeriodComment')}</InputComment>
      </View>
      <FormButton
        disabled={!isEmailValid}
        type="accent"
        title="send"
        onPress={onSubmit}
        isLoading={loading}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: PADDING_TOP,
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 200,
  },
  inputs: {
    marginBottom: 10,
  },
});
