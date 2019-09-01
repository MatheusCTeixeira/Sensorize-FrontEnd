import React      from 'react'                  ;
import Chart      from "./Chart/ChartView"          ;
import DataSource from "./DataSource/DataSourceView";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./Styles/style.css";
import "./Styles/chart-card.css";
import "./Styles/chart-comp-style.css";
import "./Styles/datasource-card.css";
import "./Styles/statistic-style.css";

/* ────────────────────────────────────────────────────────────────────────── */

// A interface IProps.
interface IProps {

};

// A interface IState.
interface IState extends IProps {

};


export default class App extends React.Component<IProps, IState> {
    state: IState;

    constructor(props: IProps) {
        super(props);
        this.state = { ...props };
    }

    render = () => (
    <div>
        <div className="top-bar">Sensorize</div>
        <div className="left-menu">
            <div className="avatar">
                <i className="material-icons">account_circle</i>
            </div>
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
        <Router basename="/">
            <div   className = "viewport">
                <Route path  = "/datasource" component = {DataSource} />
                <Route path  = "/chart"      component = {Chart} />
            </div>
        </Router>
    </div>
    );
}