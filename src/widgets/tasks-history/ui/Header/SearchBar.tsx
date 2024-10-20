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
import {FilterButton} from './FilterButton';

const PADDING_RIGHT = SCREEN_PADDING - 6;
const FILTERS = [
  {type: 'date', title: 'date', placeholder: 'dateInputPlaceholder'},
  {type: 'task', title: 'task', placeholder: 'task'},
  {type: 'note', title: 'note', placeholder: 'note'},
];

type TPropTypes = {
  setIsSearching: Dispatch<SetStateAction<boolean>>;
  isSearching: boolean;
};

export const SearchBar: FC<TPropTypes> = ({setIsSearching, isSearching}) => {
  const {t} = useTranslation();
  const [search, setSearch] = useState('');
  const input = useRef<TextInput | null>(null);
  const [filter, setFilter] = useState<string>(FILTERS[0].type);

  const selectFilter = (value: string) => {
    setFilter(value);
  };

  const inputContainerStyleAnim = useAnimatedStyle(() => {
    return {
      transform: [{translateY: withTiming(isSearching ? -40 : 0)}],
    };
  }, [isSearching]);

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

  const filterContainerStyleAnim = useAnimatedStyle(() => {
    return {
      opacity: withDelay(
        isSearching ? 150 : 0,
        withTiming(isSearching ? 1 : 0, {duration: 150}),
      ),
      zIndex: -1,
    };
  }, [isSearching]);

  const onFocus = () => {
    setIsSearching(true);
  };

  const onOpen = () => {
    if (input.current) {
      input.current.focus();
    }
  };

  const onClose = () => {
    if (input.current) input.current.blur();
    setSearch('')
    setIsSearching(false);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inputContainer, inputContainerStyleAnim]}>
        <Pressable onPress={onOpen} style={styles.inputView}>
          <SvgXml xml={searchSvg(COLORS.white)} />
          <TextInput
            ref={input}
            value={search}
            onChangeText={text => setSearch(text)}
            selectionColor={COLORS.white}
            cursorColor={COLORS.white}
            style={styles.input}
            placeholder={t('search')}
            placeholderTextColor={COLORS.white}
            onFocus={onFocus}
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
      </Animated.View>
      <Animated.View style={[styles.filterContainer, filterContainerStyleAnim]}>
        {FILTERS.map(item => (
          <FilterButton
            {...item}
            key={item.type}
            isActive={item.type === filter}
            select={selectFilter}
          />
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 10,
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
  filterContainer: {
    paddingHorizontal: SCREEN_PADDING,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    flexDirection: 'row',
  },
});
