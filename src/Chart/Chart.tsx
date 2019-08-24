import React         from "react"           ;
import ChartCard     from "./ChartCard"     ;
import ChartPrompt   from "./ChartPrompt"   ;
import DisplaySensor from "./DisplaySensor";

import { IChart } from "../Types/ChartType";

import { BrowserRouter as Router, Route } from "react-router-dom";

/* ────────────────────────────────────────────────────────────────────────── */

/* FIXME Consertar o problema com o roteamento. Quando a página é recarregada
   com o link da forma /dir/id, o estilo da página buga. */

// A interface IProps.
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

/* ────────────────────────────────────────────────────────────────────────── */

    // Adiciona um Chart para a lista de charts.
    addChart = (chart: IChart) => {
        this.setState((state, props) => ({
            charts: [...this.state.charts, chart]
        }));
    };

    // Edita um Chart;
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
        return (
        <Router>
            <div>
                <Route path="/chart" exact
                    render={(props:IProps) =>
                        <ChartPrompt {...props} addCallback={this.addChart}/>}/>

                <Route path="/chart" exact component={this.makeList}/>
                <Route exact path="/chart/:id" component={DisplaySensor}/>
            </div>
        </Router>);
    }

}