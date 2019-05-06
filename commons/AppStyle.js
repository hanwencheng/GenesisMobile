
const AppStyle = {
  mainColor: '#E4BF43',
  grayColor: '#C5C1C1',
  greenColor: '#2ED573',
  colorBlack: '#0F140D',
  placeholderColor: '#6A6A77',
  backgroundColor: '#EFEFF4',
  walletBackgroundColor: '#8C9DAA',
  secondaryColor: '#4B53FF',
  colorRed: '#FF1B43',
  backgroundCard: '#0F142E',
  backgroundBlue: '#1717A6',
  backgroundOrange: '#F76B1C',
  backgroundWhite: '#FFFFFF',
  backgroundGreen: '#1CD5BB',
  backgroundBlack: '#5F627D',
  backgroundGrey: '#E5E5E5',
  backgroundRed: '#98073B',
  tokenBlackColor: '#0f140d',
  numberEherColor: '#2d2fb1',
  dollaEtherColor: '#7f8286',
  activeProgressColor: '#e5e5e5',
  unActiveProgressColor: '#17a65e',
  greyTextInput: '#4A4A4A',
  successTextColor: '#417505',
  alphaColorImage: 'rgba(255, 255, 255,0.15)',
  cardTitleColor: '#1619a9',
  cartSubtitleColor: '#97abcd',
  textColorEther: '#61666d',
  colorPink: '#d71d4b',
  colorImageOvalBottom: '#eaf4fb',
  colorPinCode: '#131D42',
  warmGreyColor: '#9b9b9b',
  mode1: '#13192B',
  mode2: '#22273A',
  mode3: '#2E3244',
  modeAdd: '#161B2F',
  mainTextColor: '#E5E5E5',
  secondaryTextColor: '#8A8D97',
  colorDown: '#E50370',
  colorUp: '#7ED321',
  colorLines: '#1D2137',
  backgroundTextInput: '#141A2E',

  backgroundDarkMode: '#0A0F24',
  backgroundContentDarkMode: '#14192D',
  titleDarkModeColor: '#E5E5E5',
  subtitleDarkModeColor: '#8A8D97',
  backgroundDarkBlue: '#121734',

  mainFontBold: 'OpenSans-Bold',
  mainFont: 'OpenSans-Regular',
  mainFontSemiBold: 'OpenSans-Semibold',
  coverFont: 'IowanOld',

  swipeButtonBackground: '#1F2437',
  borderLinesSetting: '#1D2137',
  errorColor: '#D0021B',
  blueActionColor: '#4A90E2',

  variantConfirm: '#27B24A',
  variantDisable: '#929292',
  variantPrimary: '#4A90E2',
  lightGrey: '#929292',
  variantCancel: '#DF4F52',
  superLightGrey: '#D9D9D9',
  variantCreate: '#2F8DF4',
  headerBlack: '#2D2C33',

  fontSmall: 12,
  fontMiddleSmall: 16,
  fontMiddle: 18,
  fontMiddleBig: 22,
  fontBig: 26,

  userHeaderBackgroundColor: 'white',
  voteHeaderBackgroundColor: 'black',
  userBackgroundColor: 'white',
  coverTextBlack: '#4B4B4B',
  userCancelGreen: '#30D126',
  userCorrect: '#30D126',
  userIncorrect: '#DF4F52',
  inputPlaceholder: '#A1A1A1',
  mainBackgroundColor: '#EFEFF4',
  chatActionBackgroundColor: '#F4F4F6',
  blueIcon: '#10AEFF',
  blueButton: '#2F8DF4',
  headerBackGroundColor: '#EFEFF4',

  chatBorder: '#D8D8D8',

  mainBlue: '#2F8DF4',
  mainIcon: '#323136',
  bodyTextGrey: '#999A9B',
  mainRed: '#999A9B',
  conversationBackgroundColor: '#DFE9F5',
  mainBackgroundGrey: '#EAEAEA',
  mainBlackColor: '#000000',
  popupTextGrey: '#696969',

  fontSizeLargeTitle: 33,
  fontFamilyLargeTitle: 'Impact',
  fontSizeRegularTitle: 24,
  fontFamilyRegularTitle: 'SFProDisplay-Bold',
  fontSizeButtonSize: 20,
  fontFamilyButtonText: 'SFProText-Semibold',
  fontSizeBodyText: 18,
  fontFamilyBodyText: 'SFProText-Regular',
  fontSizeBodyBold: 18,
  fontFamilyBodyBold: 'SFProText-Bold',
  fontSizeExplanation: 13,
  fontFamilyExplanation: 'SFProText-Regular',
};

AppStyle.fontLargeTitle = {
  fontSize: AppStyle.fontSizeLargeTitle,
  fontFamily: AppStyle.fontFamilyLargeTitle,
  color: AppStyle.mainBlackColor,
};

AppStyle.fontRegularTitle = {
  fontSize: AppStyle.fontSizeRegularTitle,
  fontFamily: AppStyle.fontFamilyRegularTitle,
  color: AppStyle.mainBlackColor,
};

AppStyle.fontButtonText = {
  fontSize: AppStyle.fontSizeButtonSize,
  fontFamily: AppStyle.fontFamilyButtonText,
  color: AppStyle.mainBlackColor,
};

AppStyle.fontBodyText = {
  fontSize: AppStyle.fontSizeBodyText,
  fontFamily: AppStyle.fontFamilyBodyText,
  color: AppStyle.mainBlackColor,
};

AppStyle.fontBodyBold = {
  fontSize: AppStyle.fontSizeBodyBold,
  fontFamily: AppStyle.fontFamilyBodyBold,
  color: AppStyle.mainBlackColor,

}

AppStyle.fontExplanation = {
  fontSize: AppStyle.fontSizeExplanation,
  fontFamily: AppStyle.fontFamilyExplanation,
  color: AppStyle.bodyTextGrey,
}

AppStyle.commonHeader = {
  // headerTransparent: true,
  headerTintColor: AppStyle.colorBlack,
  headerStyle: {
    backgroundColor: AppStyle.headerBackGroundColor,
    borderBottomColor: AppStyle.chatBorder,
    borderBottomWidth: 0.5,
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerBackTitle: null,
}

export default AppStyle;
