import React from "react";

import { fetchChart } from "../Comunication/Chart";
import { IChart }     from "../Types/ChartType";

import { RouteComponentProps} from "react-router-dom";

import Graph from "../Graph/Chart";

/* ────────────────────────────────────────────────────────────────────────── */


interface IProps extends RouteComponentProps<{id: string}>{

}

interface IState extends IProps {
    chart?: IChart;
}

export default class DisplaySensor extends React.Component<IProps, IState> {
    state: IState;
    /**
     * O array subscribers é usado para notificar os componentes de estão conti-
     * dos nesse para obter os dados oriundos da fonte de dados.
     * Esta abordagem foi utilizada porque elimina a necessidade de realizar
     * mais requisições à fonte de dados.
     */
    subscribers: Array<(data: number[]) => any>;

    constructor(props: IProps) {
        super(props);
        this.state = {...props};
        this.subscribers = new Array<(data: any) => any>();
    }

    componentDidMount = () => {
        this.setState({
            chart: fetchChart(parseInt(this.props.match.params.id)),
        });

        setInterval(()=>this.fetchData(), 1000);
    }

/* ────────────────────────────────────────────────────────────────────────── */

    /**
     * Esta função é responsável por obter os dados da fonte de dados. Cada
     * fonte de dados possui uma frequência de requisição específica e,
     * portanto, a frequência de requisições enviadas a uma fonte de dados espe-
     * cífica deve estar de acordo com essa frequência.
     */
    fetchData = () => {
        const data = [10, 20, 30, 40, 60].map(v => Math.random() * v);
        this.notifyAll(data);
    }

    /**
     * Esta função adiciona uma fonte de dados na lista de componentes que
     * desejam receber os dados provinientes das fontes de dados.
    */
    subscribe = (callback: (data: number[]) => any) => {
        this.subscribers.push(callback);
    }

    /**
     * Esta função passa o parâmetro para todos os subscribers.
     */
    notifyAll(data: any) {
        this.subscribers.forEach(subscriber => subscriber(data));
    }

/* ────────────────────────────────────────────────────────────────────────── */

    render() {
        { if (this.state.chart == null) return null; }
        return <div style={{"width": "100%", "height": 400}}>
            <Graph subscripton={this.subscribe} chart={this.state.chart} width={"100%"} height={400}/>
        </div>;
    }
}