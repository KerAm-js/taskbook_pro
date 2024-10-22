import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {RecentTasks} from './ResentTasks/RecentTasks';
import {Header} from './Header/Header';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {convertInputToDate} from '../lib/convertInputToDate';

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
      <Header
        searchDate={searchDate}
        onSearchDateChange={onSearchDateChange}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
      />
      <RecentTasks isSearching={isSearching} searchDate={searchDate} />
    </Animated.View>
  );
};
