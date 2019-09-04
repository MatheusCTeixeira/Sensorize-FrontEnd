import React from "react";
import { Button, Modal } from "react-bootstrap";

import { fetch } from "../Comunication/Data";

import { IDataSource } from "../Types/DataSourceType";
import { IDataSourceStatus, EStatus } from "../Types/DataSourceStatus";

/* ────────────────────────────────────────────────────────────────────────── */

// A interface IProps.
interface IProps {
    dataSource: IDataSource;
}

// A interface IState.
interface IState extends IProps {
    modal: boolean;
    status: IDataSourceStatus;
}

// Esta classe trata das funcionalidades pertinentes aos testes de uma
// Fonte de Dados. Teste, neste contexto, significa a comunição com a
// Fonte de Dados.
export default class DataSourceTest extends React.Component<IProps, IState> {
    state: IState;

    constructor(props: IProps) {
        super(props);

        this.state = {
            ...props,
            modal: false,
            status: {
                sensorStatus  : EStatus.Off,
                uptime        : null,
                requestPerHour: null,
            }};
    }

    hideModal = () => {
        this.setState({modal: false});
    }

    showModal = () => {
        this.setState({modal: true});
    }

    componentDidMount = () => {
        this.fetchDataSourceStatus();
    }

    fetchDataSourceStatus = () => {
        fetch.status(this.state.dataSource)
        .then(status => {
            this.setState({
                status: status
            });
        })
        .catch(() => {
            this.setState({
                status: {
                    sensorStatus  : EStatus.Off,
                    uptime        : null,
                    requestPerHour: null,
                }
            });
        });
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
                <Button
                    variant="success"
                    onClick={this.fetchDataSourceStatus}>
                    Send Request
                </Button>
                <div className="p-2"/>
                <table className="table-view w-100">
                    <tbody>
                        <tr>
                            <td>Status</td>
                            <td>
                                {this.state.status.sensorStatus.toString()}
                            </td>
                        </tr>
                        <tr>
                            <td>Up Time</td>
                            <td>
                                {
                                    this.state.status.uptime  ?
                                    this.state
                                        .status
                                        .uptime
                                        .toLocaleDateString() :
                                    "--:--:--"
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Request per hour</td>
                            <td>
                                {
                                    this.state.status.requestPerHour ?
                                    this.state.status.requestPerHour :
                                    "---"
                                }
                            </td>
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