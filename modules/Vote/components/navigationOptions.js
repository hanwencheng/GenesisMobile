import React from 'react';
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
