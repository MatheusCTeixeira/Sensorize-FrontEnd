import React from "react";
import { Button, Modal } from "react-bootstrap";

import { IDataSource } from "../Types/DataSourceTypes";

// A interface IProps.
interface IProps {
    dataSource: IDataSource;

    deleteCallback: (dataSource: IDataSource) => any;
}

// A interface IState.
interface IState extends IProps {
    modal: boolean;
}

// Esta classe trata das funcionalidades pertinentes à exclusão de uma
// Fonte de Dados.
export default class DataSourceDelete extends React.Component<IProps, IState> {
    state: IState;

    constructor(props: IProps) {
        super(props);
        this.state = { ...props, modal: false };
    }

    showModal = () => {
        this.setState({modal: true});
    }

    hideModal = () => {
        this.setState({modal: false});
    }

/* ────────────────────────────────────────────────────────────────────────── */

    delete = () => {
        this.props.deleteCallback(this.props.dataSource);

        this.hideModal();
    }

/* ────────────────────────────────────────────────────────────────────────── */

    render(): React.ReactNode {
        return (<>
        <Modal show={this.state.modal} onHide={this.hideModal}>
            <Modal.Header>
                { this.state.dataSource.label }
            </Modal.Header>
            <Modal.Body>
                <h4>
                    Are you sure?
                </h4>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={this.hideModal}>
                        Cancel
                </Button>
                <Button
                    variant="danger"
                    onClick={this.delete}>
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