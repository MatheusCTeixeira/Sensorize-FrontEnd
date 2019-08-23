import React from "react";
import { Button, Modal, FormLabel, FormText } from "react-bootstrap";

import { IChart } from "../Types/ChartTypes";
import { Form } from "react-bootstrap";

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
    label      : React.RefObject<HTMLInputElement> ;
    chartType  : React.RefObject<HTMLSelectElement>;
    dataSources: React.RefObject<HTMLSelectElement>;
    bufferSize : React.RefObject<HTMLInputElement> ;

    constructor(props: IProps) {
        super(props);
        this.state = { ...props, modal: false, };

        this.label       = React.createRef();
        this.chartType   = React.createRef();
        this.dataSources = React.createRef();
        this.bufferSize  = React.createRef();
    }

/* ────────────────────────────────────────────────────────────────────────── */

    // Testa se os campos são Null.
    isInputFieldsNull: () =>  boolean = () => {
        return (
            this.label.current       == null ||
            this.chartType.current   == null ||
            this.dataSources.current == null ||
            this.bufferSize.current  == null );
    }

    // Extrai o texto dos campos.
    extractInputFields: () => IChart = () => {
        const label       = this.label.current.value;
        const chartType   = this.chartType.current.value;
        const bufferSize  = parseInt(this.bufferSize.current.value);
        const dataSources =
            Array.from(this.dataSources.current.selectedOptions).map(
                htmlOptionElement => htmlOptionElement.value
            );

        const chart: IChart = {
            ...this.state.chart,
            label      : label,
            chartType  : chartType,
            dataSources: dataSources,
            buffer     : bufferSize,
        };

        return chart;
    }

    editChart: () => void = () => {
        if (this.isInputFieldsNull())
            throw Error("Invalid Input Fields");

        const chart: IChart = this.extractInputFields();

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

    // TODO ler do servidor.
    getDataSourcesName = () => {
        return [
            "Sensor #1",
            "Sensor #2",
            "Sensor #3",
            "Sensor #4",
            "Sensor #5",
            "Sensor #6",
            "Sensor #7",
        ];
    };

    listDataSources: () => React.ReactNode[] = () => {
        const dataSources = this.getDataSourcesName();

        return (dataSources.map(dataSource =>
            <option value={dataSource}>
                {dataSource}
            </option>));
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
                ref          = {this.label}/>
            <FormText className="text-muted">
            Chart Label. Eg. Chart #1
            </FormText>

            <FormLabel>Chart Type</FormLabel>
            <select
                className="form-control"
                defaultValue={this.state.chart.chartType}
                ref={this.chartType}>
                <option value="Bar Chart">Bar Chart</option>
                <option value="Line Chart">Line Chart</option>
                <option value="Pie Chart">Pie Chart</option>
                <option value="Scatter Chart">Scatter Plot</option>
            </select>
            <FormText className="text-muted">
            Chart Type. Eg. Line Chart, Pie Chart, ...
            </FormText>

            {/* TODO Criar uma função para exibir as opções. */}
            <FormLabel>Data Sources</FormLabel>
            <select multiple
                className="form-control"
                defaultValue={this.state.chart.dataSources}
                ref={this.dataSources}>
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
                ref={this.bufferSize}
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