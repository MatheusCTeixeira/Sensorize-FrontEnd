import React       from "react"        ;
import ChartEdit   from "./ChartEdit"  ;
import ChartDelete from "./ChartDelete";

import { IChart } from "../Types/ChartType";

import ChartVisualize from "./ChartVisualize";

/* ────────────────────────────────────────────────────────────────────────── */

// A interface IProps.
interface IProps {
    chart: IChart,
    editCallback: (chart: IChart) => any;
    deleteCallback: (chart: IChart) => any;
};

// A interface IState.
interface IState extends IProps {
    chart: IChart;
};

// Esta classe é responsável pela exibição dos Cards dos Charts cadastrados.
export default class ChartCard extends React.Component<IProps, IState> {
    state: IState;

    constructor(props: IProps) {
        super(props);
        this.state = props;
    }

    public render() {
        return (
        <div className="card m-4 chart-card">
        <h5 className="card-header">{this.state.chart.label}</h5>
        <div className="card-body">
            <h5 className="card-title">Data Source features:</h5>
            <div className="card-text w-100">
                <table className="chart-features">
                    <tbody>
                    <tr>
                        <td>Label</td>
                        <td>{this.state.chart.label}</td>
                    </tr>
                    <tr>
                        <td>Data Sources</td>
                        <td>{this.state.chart.dataSources.reduce(
                            (_, dataSource) => _ + ", " + dataSource)}</td>
                    </tr>
                    <tr>
                        <td>Chart Type</td>
                        <td>{this.state.chart.chartType}</td>
                    </tr>
                    <tr>
                        <td>Chart Buffer</td>
                        <td>{this.state.chart.buffer}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <ChartDelete
                chart={this.state.chart}
                deleteCallback={this.props.deleteCallback}/>

            <ChartEdit
                chart={this.state.chart}
                editCallback={this.props.editCallback}/>

            <ChartVisualize
                chart={this.state.chart} />
        </div>
        </div>);
    }
}