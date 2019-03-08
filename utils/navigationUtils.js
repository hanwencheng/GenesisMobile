import { NavigationActions, StackActions } from 'react-navigation';
import { screensList } from '../navigation/screensList';

export const resetNavigation = (navigation, nextScreenLabel) => {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: nextScreenLabel })],
  });
  navigation.dispatch(resetAction);
}