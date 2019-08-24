import React from "react";

import { IDataSource } from "../Types/DataSourceType";
import { Button, Form, Modal } from "react-bootstrap";

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

    ipAddress      : React.RefObject<HTMLInputElement>;
    port           : React.RefObject<HTMLInputElement>;
    label          : React.RefObject<HTMLInputElement>;
    dataType       : React.RefObject<HTMLInputElement>;
    sampleFrequency: React.RefObject<HTMLInputElement>;

    constructor(props: IProps) {
        super(props);
        this.state = { ...props, modal: false, };

        this.ipAddress       = React.createRef();
        this.port            = React.createRef();
        this.label           = React.createRef();
        this.dataType        = React.createRef();
        this.sampleFrequency = React.createRef();
    }

    showModal = () => {
        this.setState({modal: true});
    }

    hideModal = ()  => {
        this.setState({ modal: false });
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
            ...this.props.dataSource,
            ipAddress      : ipAddress,
            port           : parseInt(port),
            label          : label,
            dataType       : dataType,
            sampleFrequency: parseInt(sampleFrequency),
        };

        return dataSource;
    }

    edit = () => {
        const editDtSrc = this.extractInputFields();

        this.props.editCallback(editDtSrc);

        this.hideModal();
    }

/* ────────────────────────────────────────────────────────────────────────── */

    makeBody = ()=> {
        return (<>
        <Form>
        <Form.Group controlId="formBasicEmail">

            <Form.Label>IP Address</Form.Label>
            <input
                type="text"
                className="form-control"
                placeholder="Data Source IP"
                defaultValue={this.state.dataSource.ipAddress}
                ref={this.ipAddress} />
            <Form.Text className="text-muted">
            Data Source IP Address. Eg. 127.0.0.1
            </Form.Text>

            <Form.Label>Port Number</Form.Label>
            <input
                type="number"
                className="form-control"
                placeholder="Port Number"
                defaultValue={this.state.dataSource.port.toString()}
                ref={this.port} />
            <Form.Text className="text-muted">
            Data Source Port Number. Eg. 3000
            </Form.Text>

            <Form.Label>Label</Form.Label>
            <input
                type="text"
                className="form-control"
                placeholder="Data Source Label"
                defaultValue={this.state.dataSource.label}
                ref={this.label} />
            <Form.Text className="text-muted">
            Data Source Label. Eg. Sensor #1
            </Form.Text>

            <Form.Label>Data Type</Form.Label>
            <input
                type="text"
                className="form-control"
                placeholder="Data Type"
                defaultValue={this.state.dataSource.dataType}
                ref={this.dataType} />
            <Form.Text className="text-muted">
            Continuous or Discrete.
            </Form.Text>

            <Form.Label>Sample Frequency</Form.Label>
            <input
                type="number"
                className="form-control"
                placeholder="Sample Frequency"
                defaultValue={this.state.dataSource.sampleFrequency.toString()}
                ref={this.sampleFrequency}/>
            <Form.Text className="text-muted">
            Sample Frequency ≤ 4Hz.
            </Form.Text>

        </Form.Group>
        </Form>
        </>);
    }

    render(): React.ReactNode {
        return (<>
        <Modal show={this.state.modal} onHide={this.hideModal}>
            <Modal.Header>
                { this.state.dataSource.label }
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
                    onClick={this.edit}>
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