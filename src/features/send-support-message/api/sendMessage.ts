import {TParamTypes} from './types';
import {prepareText} from './prepareText';
import {
  CHAT_ID,
  IDEAS_THREAD_ID,
  PARSE_MODE,
  PROBLEMS_THREAD_ID,
  URL,
} from '../config/consts';

export const sendMessage = async ({
  userInfo,
  message,
  type,
  locale,
}: TParamTypes) => {
  const text = prepareText({userInfo, locale, message});

  const message_thread_id =
    type === 'problems' ? PROBLEMS_THREAD_ID : IDEAS_THREAD_ID;

  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      parse_mode: PARSE_MODE,
      message_thread_id,
      text,
    }),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(JSON.stringify(result));
  }
};
