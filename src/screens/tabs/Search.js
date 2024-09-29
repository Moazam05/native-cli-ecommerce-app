import {View, Text} from 'react-native';
import React from 'react';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectSearchbarText} from '../../redux/searchbar/searchbarSlice';

const Search = () => {
  const searchText = useTypedSelector(selectSearchbarText);

  console.log('searchText', searchText);

  return (
    <View>
      <Text>Search </Text>
    </View>
  );
};

export default Search;
