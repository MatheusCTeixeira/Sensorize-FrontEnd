import React from "react";


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
        return <div>Hi</div>;
    }
}