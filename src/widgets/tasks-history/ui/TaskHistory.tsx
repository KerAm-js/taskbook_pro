import React, {useState} from 'react';
import {RecentTasks} from './ResentTasks/RecentTasks';
import {Header} from './Header/Header';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {convertInputToDate} from '../lib/convertInputToDate';
import {SearchBar} from './Header/SearchBar';

export const TaskHistory = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchDate, setSearchDate] = useState('');

  const onSearchDateChange = (text: string) => {
    const newText = convertInputToDate(text, searchDate);
    if (typeof newText === 'string') {
      setSearchDate(newText);
    } else {
      setSearchDate(searchDate);
    }
  };

  const styleAnim = useAnimatedStyle(() => {
    return {
      transform: [{translateY: withTiming(isSearching ? -40 : 0)}],
    };
  });

  return (
    <Animated.View style={styleAnim}>
      <Header isSearching={isSearching}>
        <SearchBar
          searchDate={searchDate}
          onSearchDateChange={onSearchDateChange}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
      </Header>
      <RecentTasks isSearching={isSearching} searchDate={searchDate} />
    </Animated.View>
  );
};
