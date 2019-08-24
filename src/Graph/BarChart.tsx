import React from "react";

import { IChart } from "../Types/ChartType";
import IGraph     from "./GraphEngine";

import { Chart, ChartData } from "chart.js";

import { Colors } from "./ColorList";

interface IProps {
    chart : IChart;
    width : number | string;
    height: number | string;
}

interface IState extends IProps {

}

export default class BarChart
    extends React.Component<IProps, IState>
    implements IGraph {

    canvas   : React.RefObject<HTMLCanvasElement>;
    viewChart: Chart;
    data     : ChartData;
    options  : Object;
    timeID   : NodeJS.Timeout;

    constructor(props: IProps) {
        super(props);
        this.canvas = React.createRef();

    }

    setupData = () => {
        return {
            labels: [],
            datasets: [{
                label          : 'Sensor #1',
                backgroundColor: Colors[0].light().toString(),
                borderColor    : Colors[0].dark().toString(),
                borderWidth    : 1,
                data           : [],
            },{
                label          : 'Sensor #2',
                backgroundColor: Colors[4].light().toString(),
                borderColor    : Colors[4].light().toString(),
                borderWidth    : 1,
                data           : [],
            },]
        } as ChartData;
    }

    setupOptions = () => {
        return {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            hover: {
                animationDuration: 1000,
            },
            legend: {
                display: true,
                position: 'bottom',
            },
            layout: {
                padding: 50,
            }

        } as object;
    }

    componentDidMount = () => {
        const ctx = this.canvas.current.getContext("2d");

        this.data = this.setupData();

        this.options = this.setupOptions();

        this.viewChart = new Chart(ctx, {
            type   : "bar",
            data   : this.data,
            options: this.options,
        });

        this.timeID = setInterval(()=>{
            this.updateGraph();
        }, 1000);
    }

    componentWillUnmount = () => {
        clearTimeout(this.timeID);
    }

    fetchData = () => {

    }

    updateGraph = () => {
        if (this.viewChart.data.labels.length > 10) {
            this.viewChart.data.labels.shift();
        }

        this.viewChart.data.datasets.forEach((dataset: any) => {
            if (dataset.data.length > 10)
                dataset.data.shift();
            dataset.data.push(Math.random() * 200)
        });
        const time = (date: Date) =>
            (`${
                date.getMinutes().toString().padStart(2, '0')
            }:${
                date.getSeconds().toString().padStart(2, '0')
            }:${
                date.getMilliseconds().toString().padStart(3, '0')
            }`);


        this.viewChart.data.labels.push(time(new Date()));
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