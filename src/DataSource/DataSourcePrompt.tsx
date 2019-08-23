import React from "react";
import { Button, Modal, Form, FormText, FormLabel, FormControl } from "react-bootstrap"

import { IPrompt } from "../Types/PromptType";
import { IDataSource } from "../Types/DataSourceTypes";

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
    extends React.Component<IProps, IState>
    implements IPrompt<IDataSource> {

    state: IState;

    ipAddress      : React.RefObject<HTMLInputElement>;
    port           : React.RefObject<HTMLInputElement>;
    label          : React.RefObject<HTMLInputElement>;
    dataType       : React.RefObject<HTMLInputElement>;
    sampleFrequency: React.RefObject<HTMLInputElement>;

    constructor(props: IProps) {
        super(props);
        this.state = { ...props, show: false };

        this.ipAddress       = React.createRef();
        this.port            = React.createRef();
        this.label           = React.createRef();
        this.dataType        = React.createRef();
        this.sampleFrequency = React.createRef();
    }

    showModal: () => void = () => {
        this.setState({show: true});
    }

    hideModal: () => void = () => {
        this.setState({show: false});
    }

/* ────────────────────────────────────────────────────────────────────────── */

    isInputFieldsNull: () => boolean = () => {
        return !(
            this.ipAddress.current       != null &&
            this.port.current            != null &&
            this.label.current           != null &&
            this.dataType.current        != null &&
            this.sampleFrequency.current != null
        );
    }

    extractInputFields: () => IDataSource = () => {
        if (this.isInputFieldsNull())
            throw Error("Invalid Input Fields");

        const ipAddress       = this.ipAddress.current.value      ;
        const port            = this.port.current.value           ;
        const label           = this.label.current.value          ;
        const dataType        = this.dataType.current.value       ;
        const sampleFrequency = this.sampleFrequency.current.value;

        // TODO preencher o ID após adicionar no servidor.
        const dataSource: IDataSource = {
            id             : Math.random(),
            ipAddress      : ipAddress,
            port           : parseInt(port),
            label          : label,
            dataType       : dataType,
            sampleFrequency: parseInt(sampleFrequency),
        };

        return dataSource;
    }

    add: () => any = () => {
        const extractedDtSrc = this.extractInputFields();

        this.props.addCallback(extractedDtSrc);

        this.hideModal();
    }

/* ────────────────────────────────────────────────────────────────────────── */

    makeAddBody: () => React.ReactNode = () => <div>
        <Form>
        <Form.Group controlId="formBasicEmail">

            <FormLabel>IP Address</FormLabel>
            <input
                type="text"
                className="form-control"
                placeholder="Data Source IP"
                ref={this.ipAddress} />
            <FormText className="text-muted">
            Data Source IP Address. Eg. 127.0.0.1
            </FormText>

            <Form.Label>Port Number</Form.Label>
            <input
                type="number"
                className="form-control"
                placeholder="Port Number"
                ref={this.port}/>
            <Form.Text className="text-muted">
            Data Source Port Number. Eg. 3000
            </Form.Text>

            <Form.Label>Label</Form.Label>
            <input
                type="text"
                className="form-control"
                placeholder="Data Source Label"
                ref={this.label} />
            <Form.Text className="text-muted">
            Data Source Label. Eg. Sensor #1
            </Form.Text>

            <Form.Label>Data Type</Form.Label>
            <input
                type="text"
                className="form-control"
                placeholder="Data Type"
                ref={this.dataType} />
            <Form.Text className="text-muted">
            Continuous or Discrete.
            </Form.Text>

            <Form.Label>Sample Frequency</Form.Label>
            <input
                type="number"
                className="form-control"
                placeholder="Sample Frequency"
                ref={this.sampleFrequency} />
            <Form.Text className="text-muted">
            Sample Frequency ≤ 4Hz.
            </Form.Text>

        </Form.Group>
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
            <Modal.Header closeButton>
                <Modal.Title>Data Source</Modal.Title>
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
        </>
        );
    }
}