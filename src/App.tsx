import React      from 'react'                  ;
import Chart      from "./Chart/ChartView"          ;
import DataSource from "./DataSource/DataSourceView";

import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import {Router} from "react-router";

import "./Styles/style.css";
import "./Styles/chart-card.css";
import "./Styles/chart-comp-style.css";
import "./Styles/datasource-card.css";
import "./Styles/statistic-style.css";
import 'react-notifications/lib/notifications.css';
import { LoginScreen } from './Login/LoginScreen';
import {Home} from './Home';
import { Intro } from './Intro';
import DisplaySensor from './Chart/DisplaySensor';
import { createBrowserHistory } from 'history';

/* ────────────────────────────────────────────────────────────────────────── */

// A interface IProps.
interface IProps {

};

// A interface IState.
interface IState extends IProps {

};


export default class App extends React.Component<IProps, IState> {
    state: IState;
    history = createBrowserHistory();


    constructor(props: IProps) {
        super(props);
        this.state = { ...props };
    }

    render = () => (
        <Router history={this.history}>
            <Switch>
                <Route exact path  = "/"  component = {Intro} />
                <Route path  = "/login" component = {LoginScreen} />
                <Route path  = "/*"  component = {Home} />
            </Switch>
            <div className="viewport">
                <Route path="/datasource" component={DataSource} />
                <Route exact path="/chart" component={Chart} />
                <Route path="/chart/:id" component={DisplaySensor} />
            </div>
        </Router>
    );
}
