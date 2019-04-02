import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppStyle from '../commons/AppStyle';

export default class SingleLineSingleValueDisplay extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string.isRequired,
    style: PropTypes.object,
    Icon: PropTypes.func,
    fontSize: PropTypes.number,
    fontColor: PropTypes.string,
  };

  static defaultProps = {
    onClick: null,
    object: {},
    Icon: null,
    fontColor: 'black',
    fontSize: AppStyle.fontMiddleSmall,
  };

  renderTitle() {
    const { Icon, title, fontSize, fontColor } = this.props;
    const fontStyleObject = { fontSize, color: fontColor };
    if (!Icon) {
      return <Text style={[styles.title, fontStyleObject]}>{title}</Text>;
    }
    return (
      <View style={styles.titleContainer}>
        <Icon style={styles.icon} />
        <Text style={[styles.title, { paddingLeft: 10 }, fontStyleObject]}>{title}</Text>
      </View>
    );
  }

  render() {
    const { onClick, style, fontColor } = this.props;

    if (!onClick) {
      return <View style={[styles.container, style]}>{this.renderTitle()}</View>;
    }

    const arrowColor = fontColor !== 'black' ? fontColor : AppStyle.lightGrey;

    return (
      <TouchableOpacity onPress={onClick} style={[styles.container, style]}>
        {this.renderTitle()}
        <View style={styles.arrowContainer}>
          <AntDesign
            name="right"
            size={AppStyle.fontMiddle}
            style={styles.arrowIcon}
            color={arrowColor}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
  },
  titleContainer: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },
  title: {
    flex: 2,
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  arrowIcon: {
    paddingLeft: 10,
  },
});
