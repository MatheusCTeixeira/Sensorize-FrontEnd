import React from "react";

import { IChart } from "../Types/ChartType";

import { Chart, ChartData, ChartOptions, ChartDataSets } from "chart.js";

import { Colors } from "./ColorList";

/* ────────────────────────────────────────────────────────────────────────── */

interface IProps {
    chart : IChart;
    width : number | string;
    height: number | string;
    subscripton: (callback: (data: number[]) => any) => any;
}

interface IState extends IProps {

}

export default class Graph
    extends React.Component<IProps, IState> {

    canvas   : React.RefObject<HTMLCanvasElement>;
    viewChart: Chart;
    data     : ChartData;
    options  : Object;
    timeID   : NodeJS.Timeout;

    constructor(props: IProps) {
        super(props);
        this.canvas = React.createRef();

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
                        borderWidth    : 1,
                        data           : [],
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
                }],
            },
            hover: {
                animationDuration: 300,
            },
            legend: {
                display: true,
                position: 'bottom',
            },
            layout: {
                padding: 50,
            },
            animation: {
                duration: 0,
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
        this.props.subscripton(this.updateGraph);
    }

    // Atualiza o gráfico quando algum dado chegar.
    // TODO identificar os formatos dos dados.
    updateGraph = (data: number[]) => {
        if (this.mappedType() === "pie")
            this.viewChart.data.labels = data.map(_=>_.toString());
        else
            this.viewChart.data.labels = data.map(_=>_.toString());

        this.viewChart.data.datasets.forEach(dataset => dataset.data = data);
        this.viewChart.update();
    }

    render = () => {
        return (
        <canvas
            ref={this.canvas}
            style={{
                "width" : this.props.width,
                "height": this.props.height,
            }} />

        );
    }
}