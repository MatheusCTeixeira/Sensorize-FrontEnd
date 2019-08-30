import React from "react";

import { RegressionChart } from "./RegressionChart";

interface IProps {

}

interface IState extends IProps {

}

export class Statistic extends React.Component<IProps, IState> {


    constructor(props: IProps) {
        super(props);
    }

    componentDidMount = () => {

    }

    render = () => {
        return (
        <div>
            <h3 className="text-primary">Statistics</h3>
            <div className="row">
                <div className="col-6">
                    <RegressionChart width={"100%"} height={"400px"}/>
                </div>
                <div className="col-6">
                    <RegressionChart width={"100%"} height={"400px"}/>
                </div>
                <div className="col-6">
                    <RegressionChart width={"100%"} height={"400px"}/>
                </div>
            </div>
        </div>)
    }
}