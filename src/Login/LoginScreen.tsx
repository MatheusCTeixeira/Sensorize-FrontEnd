import React, {Component, RefObject, createRef} from "react";
import Axios, {AxiosInstance} from "axios";
import {RegisterPrompt} from "./RegisterPrompt";
import "../Styles/login.css";
import { LoginPrompt } from "./LoginPrompt";
import {NotificationContainer} from "react-notifications";

interface IProps {

}

interface IState {

}

export class LoginScreen extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

    }

    render = () => (

    <div className="screen">
        <NotificationContainer leaveTimeout={200} enterTimeout={100}/>
        <video autoPlay muted loop id="myVideo" className="screen">
        <source src="asset/background.mp4" type="video/mp4"/>
        Your browser does not support HTML5 video.
        </video>

        <div className="register">
            <RegisterPrompt />
        </div>
        <div className="login">
            <LoginPrompt/>
        </div>
    </div>
    );
}