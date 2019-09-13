import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

import { ChartController } from "./ChartController";

import {NotificationManager} from "react-notifications";

import { IChart } from "../Types/ChartType";
import { addChart } from "../Comunication/Chart";

/* ────────────────────────────────────────────────────────────────────────── */

// A interface IProps.
interface IProps {
    addCallback: (chart: IChart) => any;
};

// A interfaxe IState.
interface IState extends IProps {
    show: boolean,
}

// Esta classe é responsável por adicionar Charts.
export default class ChartPrompt
    extends React.Component<IProps, IState> {
    state      : IState                            ;
    controller: ChartController = new ChartController();

    constructor(props: IProps) {
        super(props);
        this.state = { ...props, show: false };
    }

    // Exibe o menu.
    showModal: () => void = () => {
        this.setState({show: true});
    }

    // Esconde o menu.
    hideModal: () => void = () => {
        this.setState({show: false});
    }

/* ────────────────────────────────────────────────────────────────────────── */


    // Adiciona os dados do Chart no Banco de Dados, Atualiza o ID do Chart e
    // Adiciona na lista de charts.
    add: () => void = () => {
        if (this.controller.checkForNullInputs())
            throw Error("Invalid Input Fields");

        let chart = this.controller.readInput();
        this.hideModal();

        // TEST testar a comunicação.
        addChart(chart)
        .then(addedChart => {
            chart = addedChart;
            this.props.addCallback(chart);

            NotificationManager.success("Chart Added!");
        })
        .catch(err => {
            NotificationManager.error("Could not add Chart!");
        });
    }

    listDataSources: () => React.ReactNode[] = () => {
        return this.controller.fetchAllDataSources().map(
            (_, i) => <option key={i} value={_.id}>{_.label}</option>
        )
    }

/* ────────────────────────────────────────────────────────────────────────── */

    makeAddBody: () => React.ReactNode = () => <>
        <Form>
        <Form.Group controlId="formBasicEmail">

            <Form.Label>Label</Form.Label>
            <input
                className="form-control"
                type="text"
                placeholder="Chart Label"
                ref={this.controller.label}
                />
            <Form.Text className="text-muted">
            Chart Label. Eg. Chart #1
            </Form.Text>

            <Form.Label>Chart Type</Form.Label>
            <select
                className="form-control"
                ref={this.controller.chartType}>
                    <option value = "Bar Chart"    >Bar Chart   </option>
                    <option value = "Line Chart"   >Line Chart  </option>
                    <option value = "Pie Chart"    >Pie Chart   </option>
                    <option value = "Scatter Chart">Scatter Plot</option>
            </select>
            <Form.Text className="text-muted">
            Chart Type. Eg. Line Chart, Pie Chart, ...
            </Form.Text>

            <Form.Label>Data Sources</Form.Label>
            <select multiple
                className="form-control"
                ref={this.controller.dataSources}>
                { this.listDataSources() }
            </select>
            <Form.Text className="text-muted">
            Data Source to be ploted. Eg. Sensor #1, ...
            </Form.Text>

            <Form.Label>Buffer Size</Form.Label>
            <input
                type="number"
                placeholder="Buffer Size"
                className="form-control"
                ref={this.controller.bufferSize}/>
            <Form.Text className="text-muted">
            The buffer size. Eg. 150 samples.
            </Form.Text>
        </Form.Group>
        </Form>
    </>;

    render(): React.ReactNode {
        return (<>
        <div
            className="add-component tootiped-component"
            onClick={this.showModal}>
            <i className="material-icons md-48">add_circle_outline</i>
            <span className="tooltiptext">Add Chart</span>
        </div>

        <Modal show={this.state.show} onHide={this.hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Chart</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            { this.makeAddBody() }
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={this.hideModal}>
                        Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={this.add}>
                        Add
                </Button>
            </Modal.Footer>
        </Modal>
        </>);
    }
}