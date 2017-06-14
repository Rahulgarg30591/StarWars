import { connect } from 'react-redux';

import Home from '../components/Home';

function mapStateToProps(state) {
    return {
        user: state.userInfo,
    }
}

export default connect(mapStateToProps)(Home);
