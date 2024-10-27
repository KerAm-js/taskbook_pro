import { FC } from 'react';
import {TextInput} from 'react-native-gesture-handler';

export const IOSKeyboardFlickeringDisable: FC = () => {
  return (
    <TextInput
      autoComplete="email"
      style={{
        width: 0.01,
        height: 0.01,
        alignSelf: 'flex-end',
      }}
    />
  );
};
