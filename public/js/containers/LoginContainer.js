import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import setUser from '../actions/LoginActions';

import Login from '../components/Login';

function mapStateToProps(state) {
    return {
        users: state,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ setUser }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);
