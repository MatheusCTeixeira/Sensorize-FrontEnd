import React from "react";
import * as timeseries from "timeseries-analysis";

import { Chart, ChartData, ChartPoint } from "chart.js";
import { IChartInputType, IData } from "./ChartInputType";

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
                legend: {
                    position: "bottom"
                },
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
                },
                title: {
                    display: true,
                    text: (this.props.data.dataSource.label),
                }
            }
        });

        setInterval(()=>this.updateChart(), 5000);
    }

    parseToForecast = (data: IData[]) => {
        return data.map(dt => [dt.x, dt.y]);
    }

    parseFromForecast = (data: [Date, number][]) => {
        return data.map(dt => ({x: dt[0], y: dt[1]} as IData));
    }

    forecast = (data: IData[]) => {
        return new Promise<[Date, number][]>((resolve, reject) => {
            const parsedData = this.parseToForecast(data);
            const t = new timeseries.main(parsedData);

            t.smoother({period:10}).save('smoothed');
            const bestSettings = t.regression_forecast_optimize();

            resolve(t.sliding_regression_forecast({
                sample: data.length,
                degree: 10,
                method: "ARLeastSquare",
            }).output());
        });
    }

    updateChart = () => {
        this.chartView.data.datasets[0].data =
            this.props.data.data.map(dt => dt as ChartPoint);

        if (this.props.data.data.length > 5) {
            this.forecast(this.props.data.data).then(data => {
                const parsedData = this.parseFromForecast(data);
                this.chartView.data.datasets[1].data = parsedData;
                this.chartView.update();
            });
        }

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