import {shieldSvg} from '@/shared/assets/svg/shield';
import {userSvg} from '@/shared/assets/svg/user';
import {
  checkCanUpdate,
  getNewUpdatedAt,
  UserInfo,
  useUser,
  useUserActions,
} from '@/entities/user';
import {
  FormButton,
  FormInput,
  InputComment,
  PADDING_TOP,
  SCREEN_PADDING,
  useFirebase,
  useInputValidator,
} from '@/shared';
import {useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

export const ChangeNameForm = () => {
  const user = useUser();
  const {auth, firestore} = useFirebase();
  const usersCollection = firestore.collection('Users');
  const {updateName} = useUserActions();
  const navigation = useNavigation();
  const [name, onChangeName, isNameValid, nameError] = useInputValidator({
    required: true,
    minLength: 2,
    initValue: user.name,
  });
  const [password, onChangePassword, isPasswordValid, passwordError] =
    useInputValidator({
      required: true,
      minLength: 6,
    });
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (!user.email) return;
      const authorization = await auth.signInWithEmailAndPassword(
        user.email,
        password,
      );
      const response = await usersCollection.doc(authorization.user.uid).get();
      const userInfo = response.data() as UserInfo;
      const canUpdate = checkCanUpdate(userInfo.nameUpdatedAt);
      if (canUpdate) {
        await authorization.user.updateProfile({displayName: name});
        const nameUpdatedAt: UserInfo['emailUpdatedAt'] = getNewUpdatedAt(
          userInfo.nameUpdatedAt,
        );
        usersCollection
          .doc(authorization.user.uid)
          .set({...userInfo, nameUpdatedAt});
        updateName(name);
        Alert.alert(t('success'), t('nameSuccessfullyChanged'), [
          {
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert(
          t('error'),
          t('changingPeriodComment', {label: t('fullName')}),
        );
      }
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        Alert.alert(t('error'), t('wrongPassword'));
      } else if (error.code === 'auth/network-request-failed') {
        Alert.alert(t('error'), t('noInternetConnection'));
      } else {
        Alert.alert(t('error'), t('somethingWentWrong'));
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = name !== user.name && isNameValid && isPasswordValid;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      <View style={styles.inputs}>
        <FormInput
          xmlGetter={userSvg}
          value={name}
          onChangeText={onChangeName}
          placeholder="fullName"
          error={nameError}
          textContentType="name"
          autoComplete="name"
        />
        <InputComment>
          {t('changingPeriodComment', {label: t('name')})}
        </InputComment>
        <FormInput
          xmlGetter={shieldSvg}
          value={password}
          onChangeText={onChangePassword}
          placeholder="password"
          error={passwordError}
          maxLength={20}
          textContentType="password"
          autoComplete="password"
          secureTextEntry
        />
      </View>
      <FormButton
        type="accent"
        title="save"
        onPress={onSubmit}
        disabled={!isFormValid}
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
