import React from "react";

import { fetchChart } from "../Comunication/Chart";
import { IChart }     from "../Types/ChartType";

import { RouteComponentProps} from "react-router-dom";

import Graph from "../Graph/Chart";
import { IChartInputType } from "../Types/ChartInputType";
import { Statistic } from "../Graph/Statistic";

import { fetch } from "../Comunication/Data";
import { IDataSource } from "../Types/DataSourceType";

/* ────────────────────────────────────────────────────────────────────────── */


interface IProps extends RouteComponentProps<{id: string}>{

}

interface IState extends IProps {
    chart?: IChart;
}

// TODO Criar o Bar Chart.
// TODO Criar a politica de notificação de erro.

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

    /**
     * "lastDataFetched" é responsável por guardar o momenta da última amostra
     * recebido da data Source.
     */
    lastDataFetched: Map<number, Date> = new Map();

    dataSourceRequestTimer: NodeJS.Timeout[] = new Array();

    constructor(props: IProps) {
        super(props);
        this.state = {...props};
        this.subscribers = new Array<(data: any) => any>();
    }

    /**
     * Inicia a realizar o fetch dos dados nas data sources. Cada data source
     * possui sua frequência de amostragem específica e, portanto, deve possuir
     * um timer de acordo com essa frequência.
     */
    startSampling = () => {
        this.state.chart
            .dataSources
            .forEach(dataSource => {
                const timerID = setInterval(
                    () => this.fetchData(dataSource),
                    1000 / dataSource.sampleFrequency
                );

                this.dataSourceRequestTimer.push(timerID);
            });
    }

    componentDidMount = () => {
        this.setState({
            chart: fetchChart(parseInt(this.props.match.params.id)),
        });
    }

    componentWillUnmount = () => {
        this.dataSourceRequestTimer.forEach(clearInterval);
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

    fetchTimeseries = (dataSource: IDataSource) => {
        if (!this.lastDataFetched.has(dataSource.id))
            this.lastDataFetched.set(dataSource.id, new Date());

        fetch.data(dataSource, this.lastDataFetched.get(dataSource.id))
        .then(data => {
            const dataSamples = data.data;
            const lastDate = data.data[data.data.length - 1].x as Date;
            dataSamples.forEach(sample => sample.x = new Date(sample.x));

            this.lastDataFetched.set(dataSource.id, lastDate);
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
    fetchData = (dataSource: IDataSource) => {
        if (this.state.chart.chartType !== "Bar Chart")
            this.fetchTimeseries(dataSource);
        else
            this.fetchBar();
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
        this.startSampling();
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