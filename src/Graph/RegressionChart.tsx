import React from "react";

import { Chart, ChartData, ChartPoint } from "chart.js";
import { IChartInputType } from "./ChartInputType";

interface IProps {
    width: number|string;
    height: number|string;
    data: IChartInputType;
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
                    label: "Samples",
                    data: [],
                    fill: false,
                    borderColor: "black",
                    backgroundColor: "white",
                    showLine: false,
                },{
                    label: "Regression",
                    data: [],
                    fill: false,
                    borderColor: "black",
                    backgroundColor: "red",
                    showLine: true,
                },]
            },
            type: "line",
            options: {
                scales: {
                    xAxes: [{
                        display: true,
                        type: "time",
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
                layout: {
                    padding: {
                        bottom: 120
                    },
                }
            }
        });

        setInterval(()=>this.updateChart(), 5000);
    }

    updateChart = () => {
        this.chartView.data.datasets[0].data =
            this.props.data.data.map(dt => dt as ChartPoint);

        this.chartView.data.datasets[1].data =
            [...this.props.data.data.map(dt => {
                    dt = {x: dt.x, y: Math.random()*50}
                    return dt as ChartPoint;
                })];

        this.chartView.update();
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