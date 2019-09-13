import React from 'react';
import Chart from "./Chart/ChartView";
import DataSource from "./DataSource/DataSourceView";

import {NotificationContainer} from "react-notifications";

import { BrowserRouter as Router, Route, Link, RouteComponentProps, withRouter } from "react-router-dom";
import { getUserData } from './Comunication/Login';

/* import "./Styles/style.css";
import "./Styles/chart-card.css";
import "./Styles/chart-comp-style.css";
import "./Styles/datasource-card.css";
import "./Styles/statistic-style.css"; */

/* ────────────────────────────────────────────────────────────────────────── */

// A interface IProps.
interface IProps extends RouteComponentProps {

};

// A interface IState.
interface IState extends IProps {

};


class Home_ extends React.Component<IProps, IState> {
    state: IState;

    constructor(props: IProps) {
        super(props);
        this.state = { ...props };
    }

    componentDidMount = () => {
        this.fetchUserData();
    }

    fetchUserData = () => {
        // Busca os dados do usuário para exibir no menu inicial.
        getUserData()
        .then(data => {
            // Exibe o avatar do usuário.
            const img = document.getElementById("avatar");
            img.setAttribute("src", data.avatar);
            img.setAttribute("title", data.name);
        })
        .catch(error => {
            this.props.history.push("/login");
        });
    }

    render = () => (
        <div>
            <NotificationContainer leaveTimeout={200} enterTimeout={100}/>
            <div className="top-bar">
                <Link to="/home">
                    <label>
                        Sensorize
                </label>
                </Link>
                <div className="hr" />
            </div>
            <div className="left-menu">
                <div className="avatar">
                    <img id="avatar"/>
                </div>
                <div className="gap"></div>
                <Link to="/home">
                    <div className="menu-item">
                        <i className="material-icons mx-1">home</i>
                        <label>Home</label>
                    </div>
                </Link>
                <Link to="/chart">
                    <div className="menu-item">
                        <i className="material-icons mx-1">insert_chart</i>
                        <label>Charts</label>
                    </div>
                </Link>
                <Link to="/datasource">
                    <div className="menu-item">
                        <i className="material-icons mx-1">
                            settings_applications
                    </i>
                        <label>Data Source</label>
                    </div>
                </Link>
                <Link to="/logout">
                    <div className="menu-item">
                        <i className="material-icons mx-1">exit_to_app</i>
                        <label>Logout</label>
                    </div>
                </Link>
            </div>
            {/*  <Router>
                <div className="viewport">
                    <Route path="/datasource" component={DataSource} />
                    <Route path="/chart" component={Chart} />
                </div>
            </Router> */}

        </div>
    );
}


const Home = withRouter(Home_);
export {Home};