import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

interface IBasicProps {
  initValue?: string | null;
  required?: boolean;
}

interface IDefaultProps extends IBasicProps {
  minLength?: never;
  pattern?: never;
  patternErrorMessage?: never;
  valueToConfirm?: never;
  confirmationErrorMessage?: never;
}

interface IPropsWithMinLength extends IBasicProps {
  minLength: number;
  pattern?: never;
  patternErrorMessage?: never;
  valueToConfirm?: never;
  confirmationErrorMessage?: never;
}

interface IPropsWithPattern extends IBasicProps {
  pattern: RegExp;
  patternErrorMessage: string;
  minLength?: never;
  valueToConfirm?: never;
  confirmationErrorMessage?: never;
}

interface IPropsWithValueToConfirm extends IBasicProps {
  valueToConfirm: string;
  confirmationErrorMessage: string;
  minLength?: never;
  pattern?: never;
  patternErrorMessage?: never;
}
type TProps =
  | IDefaultProps
  | IPropsWithMinLength
  | IPropsWithPattern
  | IPropsWithValueToConfirm;

type TInputValidator = (
  props: TProps,
) => [
  value: string,
  onChangeValue: (text: string) => void,
  isValid: boolean,
  error: string,
  showErrorForce?: boolean,
];

export const useInputValidator: TInputValidator = ({
  initValue,
  required,
  pattern,
  patternErrorMessage,
  minLength,
  valueToConfirm,
  confirmationErrorMessage,
}) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const {t} = useTranslation();

  const onValueValid = () => {
    setIsValid(true);
    setError('');
  };

  const validateRequiredValue = (text: string) => {
    if (!required) return;
    if (required && text?.length === 0) {
      setIsValid(false);
      setError(t('requiredValidationError'));
    } else {
      onValueValid();
    }
  };

  const validateMinLength = (text: string) => {
    if (!minLength) return;
    if (minLength && text.trim().length < minLength) {
      setIsValid(false);
      setError(t('minLengthValidationError', {length: minLength}));
    } else {
      onValueValid();
    }
  };

  const validatePattern = (text: string) => {
    if (!pattern) return;
    if (text.length === 0 || (pattern && !pattern.test(text))) {
      setIsValid(false);
      setError(t(patternErrorMessage));
    } else {
      onValueValid();
    }
  };

  const validateWithValueToConfirm = (text: string) => {
    if (!valueToConfirm) return;
    if (!text || valueToConfirm !== text) {
      setIsValid(false);
      setError(t(confirmationErrorMessage));
    } else {
      onValueValid();
    }
  };

  const onChangeValue = (text: string) => {
    setValue(text);
    validateRequiredValue(text);
    validateMinLength(text);
    validatePattern(text);
    validateWithValueToConfirm(text);
  };

  useEffect(() => {
    onChangeValue(initValue || '');
  }, []);

  useEffect(() => {
    if (!!valueToConfirm?.length && value.length > 0) {
      validateWithValueToConfirm(value);
    }
  }, [valueToConfirm]);

  const showErrorForce =
    value.length > 0 && value.length === valueToConfirm?.length;

  return [value, onChangeValue, isValid, error, showErrorForce];
};
