import { NavigationActions } from 'react-navigation';
import { screensList } from '../../navigation/screensList';

export const lockScreen = (navigation, shouldShowCancel = false) =>
  new Promise((resolve, reject) => {
    navigation.navigate(screensList.Unlock.label, {
      resolve,
      reject,
      shouldShowCancel,
      isReset: false,
    });
  });

export const resetPincode = navigation => {
  return new Promise((resolve, reject) => {
    navigation.navigate(screensList.Unlock.label, {
      resolve,
      reject,
      shouldShowCancel: true,
      isReset: true,
    });
  });
};

export function pushToScreen(routeName, params = null) {
  this.navigator &&
    this.navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      })
    );
}
