import React from "react";
import { Link } from "react-router-dom";

import { IChart } from "../Types/ChartType";

/* ────────────────────────────────────────────────────────────────────────── */

// A interface IProps.
interface IProps {
    chart: IChart,
};

// A interface IState.
interface IState extends IProps {
};

// Esta classe é responsável pela visualização de um Chart. Isto inclue
// a plotagem, o query aos sensores e, se necessário, calculos estátisticos
// para a predição de dados.
export default class ChartVisualize extends React.Component<IProps, IState> {
    state: IState;

    constructor(props: IProps) {
        super(props);
        this.state = props;
    }

    render(): React.ReactNode {
        return (<>
        <Link
            to={`/chart/${this.state.chart.id}`}
            className="btn text-primary mx-2 tootiped-component">
            <i className="material-icons">remove_red_eye</i>
            <span className="tooltiptext">Visualize Chart</span>
        </Link>
        </>);
    }
}