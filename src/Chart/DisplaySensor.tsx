import React from "react";

import { fetchChart } from "../Comunication/Chart";
import { IChart }     from "../Types/ChartType";

import { RouteComponentProps} from "react-router-dom";

import Graph from "../Graph/Chart";
import { IChartInputType } from "../Types/ChartInputType";
import { Statistic } from "../Graph/Statistic";

import { fetchData as _fetchData } from "../Comunication/Data";

/* ────────────────────────────────────────────────────────────────────────── */


interface IProps extends RouteComponentProps<{id: string}>{

}

interface IState extends IProps {
    chart?: IChart;
}

// TODO Verificar a data da requisição mais antiga
// TODO Criar o timer para cada fonte de dados
// TODO Mudar a identificação de label para ID

export default class DisplaySensor extends React.Component<IProps, IState> {
    state: IState;
    timerID: NodeJS.Timeout;
    /**
     * O array subscribers é usado para notificar os componentes de estão conti-
     * dos nesse para obter os dados oriundos da fonte de dados.
     * Esta abordagem foi utilizada porque elimina a necessidade de realizar
     * mais requisições à fonte de dados.
     */
    subscribers: Array<(data: IChartInputType) => any>;

    constructor(props: IProps) {
        super(props);
        this.state = {...props};
        this.subscribers = new Array<(data: any) => any>();
    }

    componentDidMount = () => {
        this.setState({
            chart: fetchChart(parseInt(this.props.match.params.id)),
        });

        this.timerID = setInterval(()=>this.fetchData(), 750);
    }

    componentWillUnmount = () => {
        clearInterval(this.timerID);
    }

/* ────────────────────────────────────────────────────────────────────────── */
    fetchBar = () => {
        const Y = Math.random()*50;
        const deviation = () => Math.random() * 10;

        const Cat = ["A", "B", "C", "D", "E", "F", "G"];

        const data: IChartInputType = {
            dataSource: this.state.chart.dataSources[Math.floor(Math.random()*3)],
            data: [
                { x: Cat[Math.floor(Math.random()*Cat.length)], y: Y + deviation() },
            ]
        };
        this.notifyAll(data);
    }

    fetchScatter = () => {
        const Y = Math.random()*50;
        const deviation = () => Math.random() * 10;
        const dateDeviation = () => {
            const date = new Date();
            date.setMilliseconds(date.getMilliseconds() + deviation()* 10);
            return date;
        };

        const data: IChartInputType = {
            dataSource: this.state.chart.dataSources[Math.floor(Math.random()*3)],
            data: [
                { x: dateDeviation(), y: Y + deviation() },
                { x: dateDeviation(), y: Y + deviation() },
                { x: dateDeviation(), y: Y + deviation() },
                { x: dateDeviation(), y: Y + deviation() },
                { x: dateDeviation(), y: Y + deviation() },
                { x: dateDeviation(), y: Y + deviation() },
            ]
        };
        this.notifyAll(data);
    }

    t: number = 0;
    fetchLine = () => {
        const Y = Math.sin(this.t++/100)*50;
        const deviation = () => Math.random() * 15;

        /* const data: IChartInputType = {
            dataSource: this.state.chart.dataSources[this.t % 3],
            data: [
                { x: new Date(), y: Y + deviation() },
            ]
        };

        this.notifyAll(data); */

        _fetchData.fetch(this.state.chart.dataSources[this.t % 3])
        .then(data => {
            data.data.forEach(sample => sample.x = new Date(sample.x))
            this.notifyAll(data)
        })
        .catch(err => console.log(err));
    }

    fetchPie = () => {
        const Y = Math.random()*50;
        const deviation = () => Math.random() * 10;

        const data: IChartInputType = {
            dataSource: this.state.chart.dataSources[Math.floor(Math.random()*3)],
            data: [
                { x: new Date(), y: Y + deviation() },
            ]
        };
        this.notifyAll(data);
    }

    /**
     * Esta função é responsável por obter os dados da fonte de dados. Cada
     * fonte de dados possui uma frequência de requisição específica e,
     * portanto, a frequência de requisições enviadas a uma fonte de dados espe-
     * cífica deve estar de acordo com essa frequência.
     */
    fetchData = () => {

        this.fetchLine();
    }

    /**
     * Esta função adiciona uma fonte de dados na lista de componentes que
     * desejam receber os dados provinientes das fontes de dados.
    */
    subscribe = (callback: (data: IChartInputType) => any) => {
        this.subscribers.push(callback);
    }

    /**
     * Esta função passa o parâmetro para todos os subscribers.
     */
    notifyAll(data: IChartInputType) {
        this.subscribers.forEach(subscriber => subscriber(data));
    }

/* ────────────────────────────────────────────────────────────────────────── */

    render() {
        if (this.state.chart == null) return null;
        return (
        <div className="container mt-3">
            <Graph
                subscripton={this.subscribe}
                chart={this.state.chart}
                width={"100%"}
                height={600}/>
            <Statistic subscripton={this.subscribe} />
        </div>
        );
    }
}