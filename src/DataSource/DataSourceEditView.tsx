import React from "react";
import ModalHeader from "react-bootstrap/ModalHeader";
import {NotificationManager} from "react-notifications";
import { Button, Form, Modal, FormLabel, FormText, ModalBody, ModalFooter } from "react-bootstrap";

import { IDataSource } from "../Types/DataSourceType";
import { updateDataSource } from "../Comunication/DataSource";
import { DataSourceController } from "./DataSourceController";

/* ────────────────────────────────────────────────────────────────────────── */

// A interface IProps.
interface IProps {
    dataSource: IDataSource;

    editCallback: (dataSource: IDataSource) => any;
}

// A interface IState.
interface IState extends IProps {
    modal: boolean,
}


// Esta classe trata das funcionalidades pertinentes à edição de uma
// Fonte de Dados.
export default class DataSourceEdit
    extends React.Component<IProps, IState> {

    state: IState;
    controller: DataSourceController = new DataSourceController();

    constructor(props: IProps) {
        super(props);
        this.state = { ...props, modal: false, };
    }

    showModal = () => {
        this.setState({modal: true});
    }

    hideModal = ()  => {
        this.setState({ modal: false });
    }

/* ────────────────────────────────────────────────────────────────────────── */

    edit = () => {
        let editDtSrc = this.controller.readInput();
        editDtSrc.id = this.props.dataSource.id; // O ID se mantém.

        this.hideModal();

        // Faz a requisição para atualizar os dados do Data Source. Se os tudo
        // ocorrer corretamente uma mensagem de sucesso é exibida, caso contrá-
        // rio, uma mensagem de error é gerada.
        updateDataSource(editDtSrc)
        .then(updatedDataSource => {
            editDtSrc = updatedDataSource;

            // Adiciona na lista de Data Sources.
            this.props.editCallback(updatedDataSource);

            NotificationManager.success("Data Source updated!");

        })
        .catch(err => {
            NotificationManager.error("Unable to update Data Source!");

        });
    }

/* ────────────────────────────────────────────────────────────────────────── */

    makeBody = ()=> {
        return (<>
        <Form>
        <Form.Group controlId="formBasicEmail">

            <FormLabel>IP Address</FormLabel>
            <input
                type="text"
                className="form-control"
                placeholder="Data Source IP"
                defaultValue={this.state.dataSource.ipAddress}
                ref={this.controller.ipAddress} />
            <FormText className="text-muted">
            Data Source IP Address. Eg. 127.0.0.1
            </FormText>

            <FormLabel>Port Number</FormLabel>
            <input
                type="number"
                className="form-control"
                placeholder="Port Number"
                defaultValue={this.state.dataSource.port.toString()}
                ref={this.controller.port} />
            <FormText className="text-muted">
            Port Number ≥ 3000.
            </FormText>

            <FormLabel>Label</FormLabel>
            <input
                type="text"
                className="form-control"
                placeholder="Data Source Label"
                defaultValue={this.state.dataSource.label}
                ref={this.controller.label} />
            <FormText className="text-muted">
            Data Source Label. Eg. Sensor #1
            </FormText>

            <FormLabel>Data Type</FormLabel>
            <input
                type="text"
                className="form-control"
                placeholder="Data Type"
                defaultValue={this.state.dataSource.dataType}
                ref={this.controller.dataType} />
            <FormText className="text-muted">
            Continuous or Discrete.
            </FormText>

            <FormLabel>Sample Frequency</FormLabel>
            <input
                type="number"
                step=".1"
                className="form-control"
                placeholder="Sample Frequency"
                defaultValue={this.state.dataSource.sampleFrequency.toString()}
                ref={this.controller.sampleFrequency}/>
            <FormText className="text-muted">
            Sample Frequency ≤ 4Hz.
            </FormText>

        </Form.Group>
        </Form>
        </>);
    }

    render(): React.ReactNode {
        return (<>
        <Modal show={this.state.modal} onHide={this.hideModal}>
            <ModalHeader>
                { this.state.dataSource.label }
            </ModalHeader>
            <ModalBody>
                { this.makeBody() }
            </ModalBody>
            <ModalFooter>
                <Button
                    variant="secondary"
                    onClick={this.hideModal}>
                    Cancel
                </Button>
                <Button
                    variant="warning"
                    onClick={this.edit}>
                    Save
                </Button>
            </ModalFooter>
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