import React from "react";

import BarChart from "../Graph/BarChart";


interface IProps {

}

interface IState extends IProps {

}

export default class DisplaySensor extends React.Component<IProps, IState> {
    state: IState;

    constructor(props: IProps) {
        super(props);
        this.state = {...props};
    }

    render() {
        return <div style={{"width": "100%", "height": 400}}>
            <BarChart chart={null} width={"100%"} height={400}/>
        </div>;
    }
}