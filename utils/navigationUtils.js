import { NavigationActions, StackActions } from 'react-navigation';
import { screensList } from '../navigation/screensList';
import TinodeAPI from '../modules/Chat/TinodeAPI';

export const resetNavigation = (navigation, nextScreenLabel) => {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: nextScreenLabel })],
  });
  navigation.dispatch(resetAction);
};

export const navigateToTopic = (connected, subscribedChatId, topicId, userId) => {
  if (connected /* && subscribedChatId !== topicId */) {
    if (subscribedChatId !== null) TinodeAPI.unsubscribe(subscribedChatId);
    TinodeAPI.subscribe(topicId, userId);
  }
};

export const resetNavigationToWallet = (navigation, params) => {
  const resetAction = StackActions.reset({
    index: 1,
    actions: [
      NavigationActions.navigate({ routeName: screensList.Settings.label }),
      NavigationActions.navigate({
        routeName: screensList.Wallet.label,
        params,
      }),
    ],
  });
  navigation.dispatch(resetAction);
};

export const resetNavigationToTopic = (navigation, params) => {
  const resetAction = StackActions.reset({
    index: 1,
    actions: [
      NavigationActions.navigate({ routeName: screensList.ChatList.label }),
      NavigationActions.navigate({
        routeName: screensList.Topic.label,
        params,
      }),
    ],
  });
  navigation.dispatch(resetAction);
};
