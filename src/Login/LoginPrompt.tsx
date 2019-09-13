import React, {Component, RefObject, createRef} from "react";
import { loginUser } from "../Comunication/Login";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { withRouter, RouteComponentProps } from "react-router";

interface IProps extends RouteComponentProps {}
interface IState extends IProps {}

export class LoginPrompt_ extends Component<IProps, IState> {
    loginEmail   : RefObject<HTMLInputElement>;
    loginPassword: RefObject<HTMLInputElement>;

    constructor(props: IProps) {
        super(props);

        // Dados para logar um usuário.
        this.loginEmail    = createRef();
        this.loginPassword = createRef();
    }

    getLoginData = () => {
        const email = this.loginEmail.current.value;
        const password = this.loginPassword.current.value;

        return {email: email, password: password};
    }

    login = () => {
        const credentials = this.getLoginData();

        loginUser(credentials)
        .then(status => {
            if (status) {
                NotificationManager.success("User logged!");
                this.props.history.push("/home");
            } else {
                NotificationManager.warning("Login failed!");
                this.props.history.push("/login");
            }
        })
        .catch(err => {
            NotificationManager.error("Network error!");
        })
    }

    render = () => {
        return (<>
        <h3>Login</h3>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control"
                    ref={this.loginEmail}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    ref={this.loginPassword}/>
            </div>
            <button
                className="btn btn-primary"
                onClick={this.login}>Login</button>
        </>);
    }
}

const LoginPrompt = withRouter(LoginPrompt_);
export {LoginPrompt};