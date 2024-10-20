import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  ViewProps,
} from 'react-native';
import {TEXT_STYLES} from '../config/style/texts';
import {FC, useEffect, useRef, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {useThemeColors} from '../hooks/useTheme';
import {useTranslation} from 'react-i18next';
import {ThemedText} from './Theme';
import React from 'react';

type TPropTypes = TextInputProps & {
  xmlGetter: (color: string) => string;
  error?: string;
  showErrorForce?: boolean;
};

export const FormInput: FC<TPropTypes> = ({
  xmlGetter,
  error,
  showErrorForce,
  placeholder,
  multiline,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isTyped = useRef(false);
  const isTouched = useRef(false);
  isTouched.current = isTouched.current || !!showErrorForce;
  const isError = error && isTouched.current;
  const {colors} = useThemeColors();
  const {t} = useTranslation();
  const inputRef = useRef<TextInput>(null);

  const onPress = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    if (!isTouched.current && isTyped.current) isTouched.current = true;
    setIsFocused(false);
  };

  const containerStyle: ViewProps['style'] = [
    styles.container,
    {
      backgroundColor: colors.input,
      borderColor: isFocused
        ? colors.accent_opacity
        : isError
        ? colors.destructiveOpacity
        : colors.input,
    },
    multiline && styles.multilineContainer,
  ];

  const inputStyle: TextInputProps['style'] = [
    styles.input,
    {
      color: colors.text,
      paddingTop: multiline ? (props.value?.length ? 2 : 1) : 0,
    },
  ];

  const iconColor = isError
    ? colors.destructive
    : isFocused
    ? colors.accent
    : props.value
    ? colors.text
    : colors.textGrey;

  useEffect(() => {
    if (props.value && !isTyped.current) isTyped.current = true;
  }, [props.value]);

  return (
    <>
      <Pressable onPress={onPress} style={containerStyle}>
        <SvgXml
          xml={xmlGetter(iconColor)}
          width={18}
          height={18}
          style={multiline && styles.icon}
        />
        <TextInput
          ref={inputRef}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder ? t(placeholder) : undefined}
          placeholderTextColor={colors.textGrey}
          style={inputStyle}
          multiline={multiline}
          selectionColor={colors.accent}
          cursorColor={colors.accent}
          {...props}
        />
      </Pressable>
      {isError && (
        <ThemedText colorName="destructive" style={styles.error}>
          {error}
        </ThemedText>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 10,
    borderCurve: 'continuous',
    borderWidth: 1,
    marginBottom: 10,
    minHeight: 37,
  },
  multilineContainer: {
    paddingVertical: 6,
    minHeight: 80,
    alignItems: 'flex-start',
    paddingBottom: 0,
  },
  icon: {
    marginTop: 4,
  },
  input: {
    ...TEXT_STYLES.standart,
    flex: 1,
    marginBottom: 2,
  },
  error: {
    ...TEXT_STYLES.small,
    marginBottom: 10,
    paddingHorizontal: 12,
  },
});
