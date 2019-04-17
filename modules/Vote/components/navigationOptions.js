import React from 'react';
import AppStyle from '../../../commons/AppStyle';
import HeaderButton from '../../../components/HeaderButton';

export const generateAmendRulesNavigationOptions = title => ({ navigation }) => ({
  headerTitle: title,
  headerRight: (
    <HeaderButton
      title={'Done'}
      onPress={() => {
        navigation.goBack();
        navigation.state.params.onGoBack();
      }}
      color={'white'}
    />
  ),
  headerTintColor: 'white',
});
