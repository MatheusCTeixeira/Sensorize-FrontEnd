import React from "react";
import { Button, Modal } from "react-bootstrap";

import { IDataSource } from "../Types/DataSourceType";

// A interface IProps.
interface IProps {
    dataSource: IDataSource;
}

// A interface IState.
interface IState extends IProps {
    modal: boolean,
}

// Esta classe trata das funcionalidades pertinentes aos testes de uma
// Fonte de Dados. Teste, neste contexto, significa a comunição com a
// Fonte de Dados.
export default class DataSourceTest extends React.Component<IProps, IState> {
    state: IState;

    constructor(props: IProps) {
        super(props);
        this.state = { ...props, modal: false, };
    }

    hideModal = () => {
        this.setState({modal: false});
    }

    showModal = () => {
        this.setState({modal: true});
    }

    render() {
        return <>
        <Modal show={this.state.modal} onHide={this.hideModal}>
            <Modal.Header>
                { this.state.dataSource.label }
            </Modal.Header>
            <Modal.Body className="text-center">
                <h4>Test Data Source</h4>
                <div className="p-3"/>
                <Button variant="success">Send Request</Button>
                <div className="p-2"/>
                <table className="table-view w-100">
                        <tbody>
                        <tr>
                            <td>Status</td>
                            <td>Ok</td>
                        </tr>
                        <tr>
                            <td>Up Time</td>
                            <td>234h:22m:12s</td>
                        </tr>
                        <tr>
                            <td>Request per hour</td>
                            <td>23032</td>
                        </tr>
                        </tbody>
                    </table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.hideModal}>Cancel</Button>
            </Modal.Footer>
        </Modal>
        <Button
            className="btn btn-light text-primary mx-2 tootiped-component"
            onClick={this.showModal}>
            <i className="material-icons">network_check</i>
            <span className="tooltiptext">Test Data Source =
                {this.props.dataSource.id}</span>
        </Button>
        </>;
    }
}