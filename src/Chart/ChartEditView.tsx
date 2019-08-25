import React from "react";
import { Button, Modal, FormLabel, FormText } from "react-bootstrap";

import { IChart } from "../Types/ChartType";
import { Form } from "react-bootstrap";
import { IDataSource } from "../Types/DataSourceType";

import { ChartController } from "./ChartController";

/* ────────────────────────────────────────────────────────────────────────── */

// A interface IProps.
interface IProps {
    chart: IChart,
    editCallback: (chart: IChart) => any;
}

// A interface IState.
interface IState extends IProps {
    modal: boolean,
}

// Esta classe é responsável pela edição dos dados de um Chart.
export default class ChartEdit extends React.Component<IProps, IState> {
    state      : IState;
    controller : ChartController = new ChartController();

    constructor(props: IProps) {
        super(props);
        this.state = { ...props, modal: false, };

    }

/* ────────────────────────────────────────────────────────────────────────── */

    editChart: () => void = () => {
        if (this.controller.checkForNullInputs())
            throw Error("Invalid Input Fields");

        let chart: IChart = this.controller.readInput();
        chart.id = this.state.chart.id;

        this.props.editCallback(chart);

        this.hideModal();
    }


/* ────────────────────────────────────────────────────────────────────────── */

    showModal = () => {
        this.setState({modal: true});
    }

    hideModal = ()  => {
        this.setState({ modal: false });
    }

    listDataSources: () => React.ReactNode[] = () => {
        return this.controller.fetchAllDataSources().map(
            (_, i) => <option key={i} value={_.id}>{_.label}</option>
        )
    }

    makeBody = ()=> {
        return (<>
        <Form>
        <Form.Group controlId="formBasicEmail">

            <FormLabel>Label</FormLabel>
            <input
                type         = "text"
                className    = "form-control"
                placeholder  = "Chart Label"
                defaultValue = {this.state.chart.label}
                ref          = {this.controller.label}/>
            <FormText className="text-muted">
            Chart Label. Eg. Chart #1
            </FormText>

            <FormLabel>Chart Type</FormLabel>
            <select
                className="form-control"
                defaultValue={this.state.chart.chartType}
                ref={this.controller.chartType}>
                <option value="Bar Chart">Bar Chart</option>
                <option value="Line Chart">Line Chart</option>
                <option value="Pie Chart">Pie Chart</option>
                <option value="Scatter Chart">Scatter Plot</option>
            </select>
            <FormText className="text-muted">
            Chart Type. Eg. Line Chart, Pie Chart, ...
            </FormText>

            <FormLabel>Data Sources</FormLabel>
            <select multiple
                className="form-control"
                defaultValue={
                    this.state.chart.dataSources.map(_ => _.id.toString())
                }
                ref={this.controller.dataSources}>
                {this.listDataSources()}
            </select>
            <FormText className="text-muted">
            Data Source to be ploted. Eg. Sensor #1, ...
            </FormText>

            <FormLabel>Buffer Size</FormLabel>
            <input
                type="number"
                placeholder="Buffer Size"
                className="form-control"
                ref={this.controller.bufferSize}
                defaultValue={this.state.chart.buffer.toString()} />
            <FormText className="text-muted">
            The buffer size. Eg. 150 samples.
            </FormText>
        </Form.Group>
        </Form>
        </>);
    }

    render(): React.ReactNode {
        return (<>
        <Modal show={this.state.modal} onHide={this.hideModal}>
            <Modal.Header>
                { this.state.chart.label }
            </Modal.Header>
            <Modal.Body>
                { this.makeBody() }
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={this.hideModal}>
                    Cancel
                </Button>

                <Button
                    variant="warning"
                    onClick={this.editChart}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>

        <Button
            className="btn btn-light text-warning  mx-2 tootiped-component"
            onClick={this.showModal}>
            <i className="material-icons">edit</i>
            <span className="tooltiptext">Edit Data Source</span>
        </Button>
        </>);
    }
}