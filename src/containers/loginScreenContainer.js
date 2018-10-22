import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginScreen from '../components/loginScreen';
import * as loginActions from '../actions/loginActions';

const mapStateToProps = (state, ownProps) => {
  return ({
    login: state.login,
    data: state.data,
    auntificationError: state.auntificationError,
    loading: state.loading,
    loggedIn: state.loggedIn,
    error: state.error
  });
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)