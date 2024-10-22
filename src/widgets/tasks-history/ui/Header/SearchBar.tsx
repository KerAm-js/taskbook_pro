import {COLORS, IconButton, SCREEN_PADDING, TEXT_STYLES} from '@/shared';
import {closeSvg} from '@/shared/assets/svg/close';
import {searchSvg} from '@/shared/assets/svg/search';
import {FC, Dispatch, SetStateAction, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {SvgXml} from 'react-native-svg';

const PADDING_RIGHT = SCREEN_PADDING - 11;

export type TSearchbarPropTypes = {
  searchDate: string;
  onSearchDateChange: (text: string) => void;
  isSearching: boolean;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
};

export const SearchBar: FC<TSearchbarPropTypes> = ({
  setIsSearching,
  isSearching,
  searchDate,
  onSearchDateChange,
}) => {
  const {t} = useTranslation();
  const input = useRef<TextInput | null>(null);

  const closeButtonStyleAnim = useAnimatedStyle(() => {
    return {
      opacity: withDelay(
        isSearching ? 0 : 150,
        withTiming(isSearching ? 1 : 0, {duration: 100}),
      ),
      transform: [{translateX: withTiming(isSearching ? 0 : 40)}],
    };
  }, [isSearching]);

  const rightSpaceStyleAnim = useAnimatedStyle(() => {
    return {
      width: withTiming(isSearching ? 40 : 0),
    };
  }, [isSearching]);

  const onFocus = () => {
    setIsSearching(true);
  };

  const onBlur = () => {
    if (!searchDate && isSearching) {
      setIsSearching(false);
    }
  }

  const onOpen = () => {
    if (input.current) {
      input.current.focus();
    }
  };

  const onClose = () => {
    if (input.current) input.current.blur();
    onSearchDateChange('');
    setIsSearching(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Pressable onPress={onOpen} style={styles.inputView}>
          <SvgXml xml={searchSvg(COLORS.white)} width={18} height={18} />
          <TextInput
            ref={input}
            value={searchDate}
            onChangeText={onSearchDateChange}
            selectionColor={COLORS.white}
            cursorColor={COLORS.white}
            style={styles.input}
            placeholder={t(
              isSearching ? 'dateInputPlaceholder' : 'searchByDate',
            )}
            placeholderTextColor={COLORS.white}
            onFocus={onFocus}
            onBlur={onBlur}
            keyboardType="number-pad"
            maxLength={10}
          />
        </Pressable>
        <Animated.View style={rightSpaceStyleAnim} />
        <Animated.View style={[styles.closeButton, closeButtonStyleAnim]}>
          <IconButton
            xmlGetter={closeSvg}
            defaultTheme={'night'}
            colorName="accent"
            buttonSize={40}
            onPress={onClose}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 5,
    paddingLeft: SCREEN_PADDING,
    paddingRight: PADDING_RIGHT,
  },
  closeButton: {
    position: 'absolute',
    right: PADDING_RIGHT,
  },
  inputView: {
    backgroundColor: COLORS.whiteOpacity,
    minHeight: 40,
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'center',
    gap: 8,
    borderRadius: 10,
    borderCurve: 'continuous',
    flex: 1,
  },
  input: {
    ...TEXT_STYLES.standart,
    color: COLORS.white,
    flex: 1,
    marginBottom: 2,
  },
});
