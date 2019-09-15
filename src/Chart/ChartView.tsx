import React         from "react"           ;
import ChartCard     from "./ChartCard"     ;
import ChartPrompt   from "./ChartAddView"   ;

import {NotificationManager} from "react-notifications";

import { IChart } from "../Types/ChartType";


import * as mock from "../mock";
import { fetchAllCharts } from "../Comunication/Chart";

/* ────────────────────────────────────────────────────────────────────────── */

// A interface IProps.s
interface IProps {

}

// A interface IState.
interface IState extends IProps {
    charts: IChart[];
}

// Este classe é responsável por todas as funcionalidades pertinentes
// aos Charts. Isso inclue Adição, Remoção, Edição e Visualização.
export default class Chart extends React.Component<IProps, IState> {
    state: IState;

    constructor(props: any) {
        super(props);
        this.state = { charts: []};
    }

    componentDidMount = () => {
        fetchAllCharts()
        .then(charts => {
            this.setState({
                charts: charts,
            });
        })
        .catch(error => {
            NotificationManager.error("Could not fetch chats!");
        });
    }

    componentWillUnmount = () => {
        mock.charts.push(...this.state.charts);
    }

/* ────────────────────────────────────────────────────────────────────────── */

    // Adiciona um Chart para a lista de charts.
    addChart = (chart: IChart) => {
        this.setState((state, props) => ({
            charts: [...this.state.charts, chart]
        }));
    };

    // Edita um Chart.
    editChart = (chart: IChart) => {
        this.setState((state, props) => {
            // Verifica qual Chart foi alterado.
            const editedCharts = state.charts.map((_chart: IChart) => {
                    if (_chart.id === chart.id)
                        _chart = {..._chart, ...chart};

                return _chart;
            });

            return {
                charts: editedCharts,
            } as IState;
        });

    }

    deleteChart = (chart: IChart) => {
        this.setState((state, props) => {
            const nonRemovedCharts = state.charts.filter((_chart: IChart) => (
                _chart.id !== chart.id
            ));

            return {
                charts: nonRemovedCharts,
            } as IState;
        });
    }

    // Exibe a lista de Charts.
    makeList = () => {
        return (<div className="container">
                    <div className="row-sm-6">
                        <div className="col">
                            { this.state.charts.map((chart, i) =>
                                <ChartCard
                                    key={JSON.stringify(chart)}
                                    chart={chart}
                                    editCallback={this.editChart}
                                    deleteCallback={this.deleteChart}/>)
                            }
                        </div>
                    </div>
                </div>);
    };

/* ────────────────────────────────────────────────────────────────────────── */

    render() {
        return (<>
            <ChartPrompt addCallback={this.addChart} />
            {this.makeList()}
        </>);
    }

}