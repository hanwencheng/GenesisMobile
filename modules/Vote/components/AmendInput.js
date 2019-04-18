import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import _ from 'lodash';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import AppStyle from '../../../commons/AppStyle';
import { voteAction } from '../voteAction';

class AmendInput extends React.Component {
  static propTypes = {
    propertyPath: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    intro: PropTypes.string,
    description: PropTypes.string,
    placeholder: PropTypes.string,
    voteCached: PropTypes.object.isRequired,
    setVote: PropTypes.func.isRequired,
    isNumber: PropTypes.bool.isRequired,
    defaultValueString: PropTypes.string,
    defaultValueNumber: PropTypes.number,
    reader: PropTypes.func,
    writer: PropTypes.func,

    subscribedChatId: PropTypes.string,
    topicsMap: PropTypes.object.isRequired,
  };

  static defaultProps = {
    placeholder: '',
    intro: '',
    description: '',
    reader: _.identity,
    writer: _.identity,
  };

  componentDidUpdate(prevProps, prevState) {
    // Object.entries(this.props).forEach(
    //   ([key, val]) => prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    // );
  }

  get topicData() {
    const { subscribedChatId, topicsMap } = this.props;
    return _.get(topicsMap, subscribedChatId, {});
  }

  render() {
    const {
      unit,
      placeholder,
      intro,
      description,
      setVote,
      propertyPath,
      isNumber,
      voteCached,
      reader,
      writer,
    } = this.props;
    const numberWriter = v => (isNaN(v) || v === '' ? 0 : Number(Number.parseFloat(v).toFixed(1)));
    const numberReader = v => v.toString();
    const defaultValue = _.get(this.topicData, propertyPath);
    const value = _.get(voteCached, propertyPath, defaultValue);

    return (
      <View style={styles.container}>
        <Text style={styles.intro}>{intro}</Text>
        <View style={styles.inputContainer}>
          <View style={styles.mainInput}>
            <TextInput
              style={styles.input}
              onChangeText={v => {
                const formattedValue = isNumber ? numberWriter(v) : writer(v);
                setVote(_.set({}, propertyPath, formattedValue));
              }}
              value={isNumber ? numberReader(value) : reader(value)}
              placeholder={placeholder}
            />
            <Text style={styles.unitText}>{unit}</Text>
          </View>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  voteCached: state.vote.cached,
  subscribedChatId: state.chat.subscribedChatId,
  topicsMap: state.topics.topicsMap,
});

const mapDispatchToProps = _.curry(bindActionCreators)({
  setVote: voteAction.setVote,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AmendInput);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: AppStyle.mainBackgroundColor,
    alignItems: 'stretch',
  },
  intro: {
    paddingVertical: 50,
    paddingHorizontal: 30,
    color: 'black',
    fontSize: AppStyle.fontMiddle,
    fontFamily: AppStyle.mainFont,
  },
  description: {
    padding: 30,
    color: AppStyle.lightGrey,
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontMiddleSmall,
  },
  inputContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainInput: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginVertical: 80,
    paddingVertical: 20,
  },
  input: {
    flex: 2,
    color: 'black',
    textAlign: 'center',
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontMiddle,
  },
  unitText: {
    flex: 1,
    textAlign: 'right',
    color: 'red',
    fontFamily: AppStyle.mainFont,
    fontSize: AppStyle.fontMiddle,
  },
});
