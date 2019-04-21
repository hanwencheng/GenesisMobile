import React from 'react';
import HeaderButton from '../../../components/HeaderButton';
import AppStyle from "../../../commons/AppStyle";

export const generateAmendRulesNavigationOptions = title => ({ navigation }) => ({
  headerTitle: title,
  headerRight: (
    <HeaderButton
      title={'Done'}
      onPress={() => {
        navigation.goBack();
        navigation.state.params.onGoBack();
      }}
      color={AppStyle.colorBlack}
    />
  ),
  ...AppStyle.commonHeader,
});
