import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";

import "./Styles/style.css";
import "./Styles/chart-card.css";
import "./Styles/chart-comp-style.css";
import "./Styles/datasource-card.css";
import "./Styles/statistic-style.css";

function BootstrapApp() {
    return (<>
        <BrowserRouter
            basename={"/"}
            forceRefresh={true}>
            <App/>
        </BrowserRouter>
    </>);
}

ReactDOM.render(<BootstrapApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
