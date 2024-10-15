import React, { FC, useCallback, useEffect, useRef } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
} from "react-native";
import { CustomText } from "@/shared/ui/CustomText";
import { TEXT_STYLES } from "@/shared/config/style/texts";

type TPropTypes = {
  data: Array<number>;
  selectedItem: number;
  onSelect: (value: number) => void;
  titleGetter?: (value: number) => string;
};

type TItemPropTypes = {
  isSelected?: boolean;
  item: TPropTypes["selectedItem"];
  onPress: () => void;
} & Pick<TPropTypes, "titleGetter">;

const Item: FC<TItemPropTypes> = ({
  isSelected,
  onPress,
  titleGetter,
  item,
}) => {
  return (
    <Pressable onPress={onPress}>
      <CustomText
        colorName={isSelected ? "accent" : "textGrey"}
        themed
        style={
          isSelected
            ? TEXT_STYLES.standartSemibold
            : TEXT_STYLES.standartSemibold
        }
      >
        {titleGetter ? titleGetter(item) : item}
      </CustomText>
    </Pressable>
  );
};

export const Picker: FC<TPropTypes> = ({
  data,
  selectedItem,
  onSelect,
  titleGetter,
}) => {
  const flatlist = useRef<FlatList>(null);

  const scrollList = (index: number) => {
    if (flatlist.current && index < data.length)
      flatlist.current.scrollToIndex({ animated: true, index });
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<number>) => {
    const onPress = () => {
      scrollList(index);
      onSelect(item);
    };
    return (
      <Item
        onPress={onPress}
        isSelected={item === selectedItem}
        item={item}
        titleGetter={titleGetter}
      />
    );
  };

  useEffect(() => {
    scrollList(0);
  }, [data]);

  const keyExtractor = useCallback(
    (item: number | string) => item.toString(),
    []
  );

  return (
    <FlatList
      ref={flatlist}
      data={data}
      horizontal
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    gap: 25,
    paddingHorizontal: 4,
  },
});
