import React from "react";

import { RegressionChart } from "./RegressionChart";
import { IChartInputType } from "./ChartInputType";
import { dataSources } from "../mock";

interface IProps {
    subscripton: (callback: (data: IChartInputType) => any) => any;
}

interface IState extends IProps {
    dataSourcesData: IChartInputType[];
}

export class Statistic extends React.Component<IProps, IState> {
    state: IState;

    constructor(props: IProps) {
        super(props);

        this.state = {
            ...props,
            dataSourcesData: new Array<IChartInputType>()
        };
    }

    componentDidMount = () => {
        this.props.subscripton(this.storeData);
    }

    storeData = (data: IChartInputType) => {
        if (this.state.dataSourcesData.findIndex(
            dt => dt.dataSource.id === data.dataSource.id) < 0) {
            this.setState((state, props) => { return {
                dataSourcesData: [...state.dataSourcesData, data]
            }});
        }

        this.state.dataSourcesData.forEach((dt => {
            if (dt.dataSource.id === data.dataSource.id) {
                dt.data.push(...data.data);
            }
        }));
    }

    render = () => {
        if (this.state.dataSourcesData.length < 1) return null;
        return (
        <div className="container mt-5">
            <h3 className="text-primary">Statistics</h3>
            <div className="row">
                <div className="col-6">
                    <RegressionChart
                        data={this.state.dataSourcesData[0]}
                        width={"100%"}
                        height={"400px"}/>
                </div>
                <div className="col-6">
                    <RegressionChart
                        data={this.state.dataSourcesData[1]}
                        width={"100%"}
                        height={"400px"}/>
                </div>
            </div>
        </div>)
    }
}