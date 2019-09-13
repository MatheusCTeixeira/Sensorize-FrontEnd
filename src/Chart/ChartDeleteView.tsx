import React from "react";
import { Button, Modal } from "react-bootstrap";

import {NotificationManager} from "react-notifications";

import { IChart } from "../Types/ChartType";
import { deleteChart } from "../Comunication/Chart";

/* ────────────────────────────────────────────────────────────────────────── */

// A interface IProps.
interface IProps {
    chart: IChart,
    deleteCallback: (chart: IChart) => any,
}

// A interface IState.
interface IState extends IProps {
    modal: boolean,
}

// Esta classe é responsável pela remoção de Charts.
export default class ChartDelete extends React.Component<IProps, IState> {
    state: IState;

    constructor(props: IProps) {
        super(props);
        this.state = { ...props, modal: false};
    }

/* ────────────────────────────────────────────────────────────────────────── */

    removeChart = () => {
        const chart = this.state.chart;

        // TEST Testar comunicação com o servidor.
        deleteChart(chart.id)
        .then(res => {
            if (!res)
                throw new Error("Could not delete Chart!");

            this.props.deleteCallback(chart);
        })
        .catch(err => {
            NotificationManager.error("Could not delete Chart!");
        });

        this.hideModal();
    }

/* ────────────────────────────────────────────────────────────────────────── */

    showModal = () => {
        this.setState({modal: true});
    }

    hideModal = () => {
        this.setState({modal: false});
    }

    render(): React.ReactNode {
        return (<>
        <Modal show={this.state.modal} onHide={this.hideModal}>
            <Modal.Header>
                { this.state.chart.label }
            </Modal.Header>
            <Modal.Body>
                <h4>
                    Are you sure?
                </h4>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary"
                    onClick={this.hideModal}>
                    Cancel
                </Button>

                <Button variant="danger"
                    onClick={this.removeChart}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
        <Button
            className="btn btn-light text-danger mx-2 tootiped-component"
            onClick={this.showModal}>
            <i className="material-icons">delete_forever</i>
            <span className="tooltiptext">Delete Data Source</span>
        </Button>
        </>);
    }
}