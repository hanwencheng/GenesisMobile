import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { wsInfo } from '../../../config';
import TinodeAPI from '../TinodeAPI';

export default class Connector extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    TinodeAPI.connect();
  }

  componentDidMount() {
    //TODO to be removed
    const username = 'bob';
    const password = 'bob123';
  }

  render() {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {},
});
