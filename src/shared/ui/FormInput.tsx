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
  passValueToInput?: boolean;
  isInputArea?: boolean;
};

export const FormInput: FC<TPropTypes> = ({
  xmlGetter,
  error,
  showErrorForce,
  placeholder,
  isInputArea,
  passValueToInput = true,
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
    props.multiline && styles.multilineContainer,
    isInputArea && styles.inputAreaContainer,
  ];

  const inputStyle: TextInputProps['style'] = [
    styles.input,
    {
      color: colors.text,
      paddingTop: isInputArea ? (props.value?.length ? 2 : 1) : 0,
    },
    props.multiline && styles.multilineInput,
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
      <Pressable onPress={onPress} style={[containerStyle, props.style]}>
        <SvgXml
          xml={xmlGetter(iconColor)}
          width={18}
          height={18}
          style={props.multiline && styles.icon}
        />
        <TextInput
          {...props}
          ref={inputRef}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder ? t(placeholder) : undefined}
          placeholderTextColor={colors.textGrey}
          selectionColor={colors.accent}
          cursorColor={colors.accent}
          style={inputStyle}
          value={passValueToInput ? props.value : undefined}
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
    alignItems: 'flex-start',
    paddingBottom: 0,
  },
  inputAreaContainer: {
    minHeight: 80,
  },
  icon: {
    marginTop: 3,
  },
  input: {
    ...TEXT_STYLES.standart,
    flex: 1,
    marginBottom: 2,
  },
  multilineInput: {
    marginBottom: 0,
    marginTop: 2,
    lineHeight: 19
  },
  error: {
    ...TEXT_STYLES.small,
    marginBottom: 10,
    paddingHorizontal: 12,
  },
});
