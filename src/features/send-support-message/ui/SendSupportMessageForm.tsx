import {
  FormButton,
  FormInput,
  InputComment,
  PADDING_TOP,
  SCREEN_PADDING,
  useInputValidator,
} from '@/shared';
import {dangerSvg} from '@/shared/assets/svg/danger';
import {lightBulbSvg} from '@/shared/assets/svg/lightBulb';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {sendMessage} from '../api/sendMessage';
import {useUser} from '@/entities/user';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';

type TPropTypes = {
  type: 'problems' | 'ideas';
};

export const SendSupportMessageForm = ({type}: TPropTypes) => {
  const {data: user} = useUser();
  const [loading, setLoading] = useState(false);
  const {i18n, t} = useTranslation();
  const [message, onMessageChange, isMessageValid, messageError] =
    useInputValidator({
      required: true,
      minLength: 10,
    });

  const xmlGetter = type === 'ideas' ? lightBulbSvg : dangerSvg;
  const placeholder = type === 'ideas' ? 'howToImproveApp' : 'describeProblem';
  const inputComment =
    type === 'ideas'
      ? 'ifYouHaveIdeasWriteAboutIt'
      : 'writeAboutProblemYouHaveUsingTaskbook';

  const onPress = async () => {
    try {
      if (user) {
        setLoading(true);
        await sendMessage({
          userInfo: user,
          message,
          locale: i18n.language,
          type,
        });
        setLoading(false);
      }
      Alert.alert(
        t('messageSent'),
        t(
          type === 'ideas' ? 'thanksForYourIdeas' : 'thanksForReportingProblem',
        ),
        [
          {
            onPress: () => {
              onMessageChange('');
            },
          },
        ],
      );
    } catch (error) {
      Alert.alert(t('somethingWentWrong'));
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      <View style={styles.inputs}>
        <FormInput
          value={message}
          onChangeText={onMessageChange}
          error={messageError}
          xmlGetter={xmlGetter}
          placeholder={placeholder}
          multiline
          isInputArea
        />
        <InputComment>{t(inputComment)}</InputComment>
      </View>

      <FormButton
        type="accent"
        title="send"
        onPress={onPress}
        disabled={!isMessageValid}
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
