import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import AppStyle from '../commons/AppStyle';

const { height, width } = Dimensions.get('window');
const isSmallScreen = height < 569;

export const VariantList = {
  CONFIRM: 'confirm',
  CANCEL: 'cancel',
  PRIMARY: 'primary',
  CREATE: 'create',
};

const getBackgroundColor = (variant, disabled) => {
  if (disabled) return AppStyle.variantDisable;
  switch (variant) {
    case VariantList.CONFIRM:
      return AppStyle.mainBlue;
    case VariantList.CANCEL:
      return AppStyle.variantCancel;
    case VariantList.PRIMARY:
      return AppStyle.variantPrimary;
    case VariantList.CREATE:
      return AppStyle.variantCreate;
    default:
      return AppStyle.mainBlue;
  }
};

export default class GenesisButton extends Component {
  static propTypes = {
    action: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    style: PropTypes.object,
    styleText: PropTypes.object,
    disabled: PropTypes.bool,
    containerStyle: PropTypes.object,
    variant: PropTypes.oneOf(Object.values(VariantList)),
  };

  render() {
    const { disabled, variant, action, style, styleText, text, containerStyle } = this.props;
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={() => action()}
        style={[styles.canvas, containerStyle]}>
        <View
          style={[
            styles.container,
            { backgroundColor: getBackgroundColor(variant, disabled) },
            style,
          ]}>
          <Text style={[styles.buttonText, styleText]}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  canvas: {},
  container: {
    borderRadius: 5,
    flexDirection: 'row',
    height: 61,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: width * 0.025,
    marginHorizontal: width * 0.15,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: AppStyle.fontSizeButtonSize,
    fontFamily: AppStyle.fontFamilyButtonText,
    color: 'white',
  },
});
