import React from 'react';
import connect from 'react-redux/es/connect/connect';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { screensList } from '../../../navigation/screensList';
import AmendInput from '../components/AmendInput';
import { groupMetaRules } from '../../../config';
import { generateAmendRulesNavigationOptions } from '../components/navigationOptions';
import Container from '../../../components/Container';

class AmendDescriptionScreen extends React.Component {
  static navigationOptions = generateAmendRulesNavigationOptions(
    screensList.AmendDescription.title
  );

  render() {
    return (
      <Container>
        <AmendInput
          propertyPath={groupMetaRules.DESCRIPTION}
          unit={t.UNIT_TEXT}
          intro={t.INTRO_TEXT}
          multiline
          description={t.DESCRIPTION_TEXT}
          isNumber={false}
        />
      </Container>
    );
  }
}

const t = {
  UNIT_TEXT: '',
  INTRO_TEXT: 'What is the virtual country about? ',
  DESCRIPTION_TEXT: '',
};

const mapStateToProps = state => ({});

const mapDispatchToProps = _.curry(bindActionCreators)({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AmendDescriptionScreen);
