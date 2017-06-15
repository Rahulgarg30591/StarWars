import React, {PropTypes} from 'react';
import Spinner from 'react-spinkit';
import { postJson } from '../helpers/ajaxHelper';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);
        this.loginResult = this.loginResult.bind(this);
        //
        this.state = {
            userName: 'Luke Skywalker',
            password: '19BBY',
            loading: false,
            isError: false,
            errorMessage: '',
        };
    }

    // UserName and Password onChange event handler.
    onChange(event) {
        this.setState({[event.target.name]: event.target.value });
    }

    // Log In button event handler.
    login() {
        const loginPostObj = {
            url: "http://localhost:4000/api/login",
            data: {
                userName: this.state.userName,
                password: this.state.password,
            },
        };
        this.setState({ loading: true });

        postJson(loginPostObj, this.loginResult, (resp) => {
            this.setState({
                loading: false,
                isError: true,
                errorMessage: resp.status.message,
            });

            alert (resp.status.code + " Some Internal Error Occured.");
        });
    }

    // Log In success callback function.
    loginResult(resp) {
        if (resp.status.code === 1000) {
            this.setState({
                loading: false,
                isError: false,
                errorMessage: '',
            });
            this.props.setUser(resp.data);
            this.props.history.push("/home");
        } else if (resp.status.code === 2000) {
            this.setState({
                loading: false,
                isError: true,
                errorMessage: "Invalid Credentials",
            });
        }
    }

    // Component Render Function.
    render () {
        let error = null;
        let loadingState = null;

        if (this.state.isError) {
            error=(<center><span className="error">{this.state.errorMessage}</span></center>);
        }

        if (this.state.loading) {
            loadingState = (<div className="overlay">
                <Spinner name="circle" fadeIn='none' />
            </div>);
        }

        return(
            <div className="modal-dialog loginContainer">
                <div className="modal-content">
                    {loadingState}
                    <div className="modal-header">
                        <h2>Star Wars Login</h2>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <input
                                type="text"
                                name="userName"
                                id="userName"
                                value={this.state.userName}
                                placeholder="User Name"
                                onChange={this.onChange}
                                maxLength={250}
                                className="form-control"
                            />
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={this.state.password}
                                placeholder="Password"
                                onChange={this.onChange}
                                maxLength={250}
                                className="form-control"
                            />
                            {error}
                            <center>
                                <button
                                    onClick={this.login}
                                    className="btn btn-info btn-md"
                                    id="loginButton"
                                >
                                    Login
                                </button>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    history: PropTypes.object,
    setUser: PropTypes.func,
}

export default Login;
