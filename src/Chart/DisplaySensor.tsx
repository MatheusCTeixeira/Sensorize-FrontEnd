import React from "react";

import { fetchChart } from "../Comunication/Chart";
import { IChart } from "../Types/ChartType";

import { RouteComponentProps} from "react-router-dom";

import BarChart from "../Graph/BarChart";


interface IProps extends RouteComponentProps<{id: string}>{

}

interface IState extends IProps {
    chart?: IChart;
}

export default class DisplaySensor extends React.Component<IProps, IState> {
    state: IState;

    constructor(props: IProps) {
        super(props);
        this.state = {...props};
    }

    componentDidMount = () => {
        this.setState({
            chart: fetchChart(parseInt(this.props.match.params.id)),
        });
    }

    render() {
        { if (this.state.chart == null) return null; }
        return <div style={{"width": "100%", "height": 400}}>
            <BarChart chart={this.state.chart} width={"100%"} height={400}/>
        </div>;
    }
}