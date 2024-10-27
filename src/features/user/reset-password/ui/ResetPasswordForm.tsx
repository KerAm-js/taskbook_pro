import {emailSvg} from '@/shared/assets/svg/email';
import {useUser} from '@/entities/user';
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
import {sendPasswordResetEmail} from '../api/sendPasswordResetEmail.api';

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
    setLoading(true);
    const result = await sendPasswordResetEmail({
      auth,
      email,
      passwordResetsCollection,
    });
    Alert.alert(
      t(result.title),
      t(result.message),
      result.status === 'resolved' ? [{onPress: navigation.goBack}] : undefined,
    );
    setLoading(false);
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
          keyboardType="email-address"
          editable={!(user.uid && user.email)}
        />
        <InputComment>{t('passwordCanBeResettedNoMoreThan')}</InputComment>
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
