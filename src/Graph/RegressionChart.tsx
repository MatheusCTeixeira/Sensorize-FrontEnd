import React from "react";

import { Chart, ChartData } from "chart.js";

interface IProps {
    width: number|string;
    height: number|string;

}

interface IState extends IProps {

}

export class RegressionChart extends React.Component<IProps, IState> {
    canvas   : React.RefObject<HTMLCanvasElement>;
    chartView: Chart;

    constructor(props: IProps) {
        super(props);

        this.canvas = React.createRef();
    }

    componentDidMount = () => {
        const context = this.canvas.current.getContext("2d");
        this.chartView = new Chart(context, {
            data: {
                datasets: [{
                    label: "data",
                    data: [{x: 1, y: 2}, {x: 1.5, y: 2.5}],
                    fill: false,
                    borderColor: "purple",
                    backgroundColor: "yellow",
                }]
            },
            type: "line",
            options: {
                scales: {
                    yAxes: [{
                        stacked: true
                    },],
                    xAxes: [{
                        type: "linear"
                    }]
                },
                layout: {
                    padding: {
                        bottom: 120
                    },
                }
            }
        });
    }

    render = () => {
        return (
        <div className="container">
            <div className="row justify-content-start">
            <div style={{width: "100%", height: "300px"}}>
                <canvas
                    ref={this.canvas}
                    style={{
                        "width" : this.props.width,
                        "height": this.props.height,
                    }} />
                </div>
            </div>
        </div>);
    }
}