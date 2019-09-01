import React from "react";

import { IChart } from "../Types/ChartType";

import { Chart, ChartData, ChartOptions, ChartPoint } from "chart.js";

import { Colors } from "./ColorList";

import { IChartInputType } from "./ChartInputType";

/* ────────────────────────────────────────────────────────────────────────── */

interface IProps {
    chart : IChart;
    width : number | string;
    height: number | string;
    subscripton: (callback: (data: IChartInputType) => any) => any;
}

interface IState extends IProps {

}

export default class Graph
    extends React.Component<IProps, IState> {

    canvas   : React.RefObject<HTMLCanvasElement>;
    viewChart: Chart;
    data     : ChartData;
    options  : ChartOptions;
    timeID   : NodeJS.Timeout;
    needToUpdate: boolean;
    timerID: NodeJS.Timeout;

    constructor(props: IProps) {
        super(props);
        this.canvas = React.createRef();
        this.needToUpdate = false;
    }

    /**
     * Esta função realiza o setup de um gráfico, isto é, configura a estrutura
     * do dataset, cor e bordas. Há uma diferença entre a abordagem do Pie Chart
     * e os demais gráficos. De maneira simples, o Pie Chart não guarda histó-
     * rico dos valores passados.
     */
    setupData = () => {
        if (this.props.chart == null) return;

        let nOfDtSrc = 0;

        if (this.props.chart.chartType === "Pie Chart")
            return {
                labels: new Array<string>(),
                datasets:
                    [{
                        label: "dataSource.label",
                        backgroundColor: Colors.map(c => c.light().toString()),
                        borderColor    : Colors.map(c => c.dark().toString()),
                        borderWidth    : 1,
                        data           : new Array<number>(),
                    }]
            };
        else return {
            labels: [],
            datasets:
                this.props.chart.dataSources.map(
                    dataSource => ({
                        label: dataSource.label,
                        backgroundColor: Colors[nOfDtSrc].light().toString(),
                        borderColor    : Colors[nOfDtSrc++].light().toString(),
                        borderWidth    : 3,
                        data           : [],
                        fill: false,
                        lineTension: 0.0,
                    })
                ),
        } as ChartData;
    }

    /**
     * As opções de uma gráfico. As animações foram removidas para melhorar o
     * desempenho do sistema.
     */
    setupOptions = () => {
        const showAxis = this.mappedType() !== "pie";
        const categoryLabel = this.mappedCategory();

        return {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        display: showAxis,
                    },
                    display: showAxis,
                }],
                xAxes: [{
                    display: showAxis,
                    type: categoryLabel,
                    time: {
                        unit: "millisecond",
                    },
                    ticks: {
                        callback: function(value, index, values) {
                            const nValues = values.length;
                            const tenPerc = Math.floor(nValues / 10);

                            if (index % tenPerc === 0 || nValues < 10)
                                return value;

                            return null;
                        }
                    }
                }],
            },
            hover: {
                animationDuration: 600,
            },
            legend: {
                display: true,
                position: 'bottom',
            },
            layout: {
                padding: 50,
            },
            animation: {
                duration: 600,
            },
            title: {
                text: (this.props.chart.dataSources
                        .map(ds => ds.label)
                        .reduce((prev, curr) => `${prev}, ${curr}`)),

                display: true,
            }

        } as ChartOptions;
    }

    /**
     * Mapeia o tipo de gráfico no tipo reconhecido pelo Chart JS.
     */
    mappedType() {
        const chartType = this.props.chart.chartType;

        switch (chartType) {
        case "Bar Chart":
            return "bar";
        case "Line Chart":
            return "line";
        case "Pie Chart":
            return "pie";
        case "Scatter Plot":
            return "scatter";
        default:
            throw "Chart Type not supported.";
        }
    }

    /**
     * Mapeia a tipo de eixo baseado no tipo do gráfico.
     */
    mappedCategory() {
        const chartType = this.props.chart.chartType;

        switch (chartType) {
        case "Bar Chart":
            return "category";
        case "Line Chart":
            return "time";
        case "Pie Chart":
            return "line";
        case "Scatter Plot":
            return "time";
        default:
            throw "Chart Type not supported.";
        }
    }

    componentDidMount = () => {
        const ctx = this.canvas.current.getContext("2d");

        this.data = this.setupData();

        this.options = this.setupOptions();

        this.viewChart = new Chart(ctx, {
            type   : this.mappedType(),
            data   : this.data,
            options: this.options,
        });

        // Inscreve este componente para receber os dados da fonte de dados.
        this.props.subscripton(this.updateGraphData);

        this.timeID = setInterval(this.updateGraph, 3000);
    }

    componentWillUnmount = () => {
        if (this.timeID)
            clearInterval(this.timeID);
    }

/**
 * Pie:
 *  [A, B, C] -> onde cada uma é o valor de um data source.
 *
 * Scatter:
 *  [{x: x_0, y: y_0}, {x: x_1, y: y_1}] -> o array inteiro pertencente a
 *      uma única data source.
 *
 * Line Chart:
 *  [{x: x_0, y: y_0}, {x: x_1, y: y_1}] -> o array inteiro pertence a uma
 *      única data source.
 *
 * Bar Chart:
 * [{x: A, y: y_0}, {x: B, y: y_1}] -> a array pertence a uma data source e os
 *      labels são fixos.
 *
 * Commom Patern:
 * {
 *  dataSource: ...,
 *  data: [
 *          {x: ..., y: ...},
 *          {x: ..., y: ...},
 *                ...
 *          {x: ..., y: ...},
 *          {x: ..., y: ...},
 *      ]
 * }
 *
 */

    /**
     * Adapta os dados para a plotagem de gráficos no formate de Pie.
     */
    pieDataParse(data: IChartInputType) {
        const viewChartData = this.viewChart.data;

         // Labels para os gráficos do tipo Pie. Eixo X.
        if (viewChartData.labels.findIndex(
            lbl=>lbl===data.dataSource.label) < 0) {
            const dataSourceLabel: string = data.dataSource.label;
            viewChartData.labels.push(dataSourceLabel);
        }

        // Valores para os gráficos do tipo Pie. Eixo Y.
        this.viewChart.data.datasets.forEach((dataset, i) => {
            // Procura o id da data source baseado na do label.
            const idx = viewChartData.labels.findIndex(
                lbl => lbl === data.dataSource.label);

            // Apenas o último dado é usado, pois deve ser o mais atual.
            const length = data.data.length;
            dataset.data[idx] = data.data[length - 1].y;
        });
    }

    /**
     * Adapta os dados para a plotagem de gráficos no formato do Scatter.
     * O processamento é o mesmo aplicado ao line Chart.
     */
    scatterDataParse(data: IChartInputType) {
        this.lineDataParse(data);
    }

    /**
     * Adapta os dados para a plotagem de gráficos no formato do line Chart.
     */
    lineDataParse(data: IChartInputType) {
        const bufferSize = this.props.chart.buffer;
        const viewChartData = this.viewChart.data;

        const P = data.data.map(point => {
            return {
                x: point.x,
                y: point.y,
            } as Chart.ChartPoint;
        });

        let olderTime: Date = null;
        viewChartData.datasets.forEach(dataset => {
            const data = dataset.data;
            const len = data.length;
            const MAX_SAMPLES = this.props.chart.buffer;

            if (data.length < MAX_SAMPLES) return;
            const dt = (dataset.data[len-MAX_SAMPLES] as Chart.ChartPoint).x as Date;

            if (olderTime == null || olderTime.getTime() > dt.getTime())
                olderTime = dt;
        });

        // Valores para os demais gráficos. Eixo Y.
        viewChartData.datasets.forEach(dataset => {
            if (dataset.label === data.dataSource.label) {
                const data = dataset.data as Chart.ChartPoint[];
                const oldData = olderTime != null ? (data.filter(
                    dt => (dt.x as Date).getTime() > olderTime.getTime()
                )) : data;

                dataset.data = (
                    [
                        ...oldData,
                        ...P
                    ]
                );
            }
        });
    }

    /**
     * Adapta os dados para a plotagem de gráficos no formato do bar Chart.
     * O gráfico em barras é baseado em categorias.
     */
    barDataParse(data: IChartInputType) {
        const viewChartData = this.viewChart.data;
        const labels = new Set<string>([
            ...viewChartData.labels as string[],
            ...data.data.map(point => point.x.toString())
        ]);
        viewChartData.labels = Array.from(labels);

        this.lineDataParse(data);
    }

    // Atualiza o gráfico quando algum dado chegar.
    updateGraphData = (data: IChartInputType) => {

        switch (this.mappedType()) {
        case "pie":
            this.pieDataParse(data);
            break;
        case "line":
            this.lineDataParse(data);
            break;
        case "bar":
            this.barDataParse(data);
            break;
        case "scatter":
            this.scatterDataParse(data);
            break;
        default:
            throw "Chart Type not supported.";
        }

        this.needToUpdate = true;

    }

    // Atualiza o gráfico
    updateGraph = () => {
        if (!this.needToUpdate)
            return;

        this.viewChart.update();
        this.needToUpdate = false;
    }

    render = () => {
        return (
        <div className="container">
            <h1 className="text-primary">View</h1>
            <div style={{
                        "width" : this.props.width,
                        "height": this.props.height,
                    }}>
                <canvas
                    ref={this.canvas}
                    style={{
                        "width" : this.props.width,
                        "height": this.props.height,
                    }} />
            </div>
        </div>
        );
    }
}