import React from "react";
import ModalHeader from "react-bootstrap/ModalHeader";
import { NotificationManager } from "react-notifications";
import { Button, Modal, Form, FormText, FormLabel, FormGroup, ModalFooter,
        ModalBody, ModalTitle } from "react-bootstrap"

import { IDataSource } from "../Types/DataSourceType";
import { addDataSource } from "../Comunication/DataSource";
import { DataSourceController } from "./DataSourceController";

/* ────────────────────────────────────────────────────────────────────────── */

// A interface IProps.
interface IProps {
    addCallback: (dataSource: IDataSource) => any;
}

// A interface IState.
interface IState extends IProps {
    show: boolean;
}

// Esta classe trata das funcionalidades pertinentes à adição de uma
// Fonte de Dados.
export default class DataSourcePrompt
    extends React.Component<IProps, IState> {

    state: IState;
    controller: DataSourceController = new DataSourceController();

    constructor(props: IProps) {
        super(props);
        this.state = { ...props, show: false };
    }

    showModal: () => void = () => {
        this.setState({show: true});
    }

    hideModal: () => void = () => {
        this.setState({show: false});
    }

/* ────────────────────────────────────────────────────────────────────────── */


    add: () => void = () => {

        let dataSource = this.controller.readInput();

        this.hideModal();

        // Envia uma requisição para adicionar a DataSource. Se tudo ocorrer bem
        // a Data Source é adicionada na lista e uma mensagem de sucesso é gera-
        // da. Caso contrário, uma mensagem de erro é gerada.
        addDataSource(dataSource)
        .then(addedDataSource => {
            dataSource = addedDataSource;
            this.props.addCallback(dataSource); // Adiciona na lista.

            NotificationManager.success("Data Source added!");
        })
        .catch(() => {
            NotificationManager.error("Could not add Data Source!");
        });
    }

/* ────────────────────────────────────────────────────────────────────────── */

    makeAddBody: () => React.ReactNode = () => <div>
        <Form>
        <FormGroup controlId="formBasicEmail">

            <FormLabel>IP Address</FormLabel>
            <input
                type="text"
                className="form-control"
                placeholder="Data Source IP"
                ref={this.controller.ipAddress} />
            <FormText className="text-muted">
            Data Source IP Address. Eg. 127.0.0.1
            </FormText>

            <FormLabel>Port Number</FormLabel>
            <input
                type="number"
                className="form-control"
                placeholder="Port Number"
                ref={this.controller.port}/>
            <FormText className="text-muted">
            Port Number ≥ 3000.
            </FormText>

            <FormLabel>Label</FormLabel>
            <input
                type="text"
                className="form-control"
                placeholder="Data Source Label"
                ref={this.controller.label} />
            <FormText className="text-muted">
            Data Source Label. Eg. Sensor #1
            </FormText>

            <FormLabel>Data Type</FormLabel>
            <input
                type="text"
                className="form-control"
                placeholder="Data Type"
                ref={this.controller.dataType} />
            <FormText className="text-muted">
            Continuous or Discrete.
            </FormText>

            <FormLabel>Sample Frequency</FormLabel>
            <input
                type="number"
                className="form-control"
                placeholder="Sample Frequency"
                ref={this.controller.sampleFrequency} />
            <FormText className="text-muted">
            Sample Frequency ≤ 4Hz.
            </FormText>

        </FormGroup>
        </Form>
    </div>;

    render = () => {
        return (
        <>
        <div className="add-component tootiped-component" onClick={this.showModal}>
            <i className="material-icons md-48">add_circle_outline</i>
            <span className="tooltiptext">Add Data Source</span>
        </div>

        <Modal show={this.state.show} onHide={this.hideModal}>
            <ModalHeader /* closeButton */>
                <ModalTitle>Data Source</ModalTitle>
            </ModalHeader>

            <ModalBody>
            { this.makeAddBody() }
            </ModalBody>

            <ModalFooter>
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
            </ModalFooter>
        </Modal>
        </>
        );
    }
}