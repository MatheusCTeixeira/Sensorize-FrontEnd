import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

import { IChart } from "../Types/ChartTypes";
import { FormControl } from "react-bootstrap";
import { IPrompt } from "../Types/PromptType";

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
    extends React.Component<IProps, IState>
    implements IPrompt<IChart> {
    state      : IState                            ;
    label      : React.RefObject<HTMLInputElement> ;
    chartType  : React.RefObject<HTMLSelectElement>;
    dataSources: React.RefObject<HTMLSelectElement>;
    bufferSize : React.RefObject<HTMLInputElement> ;

    constructor(props: IProps) {
        super(props);
        this.state = { ...props, show: false };

        this.label       = React.createRef();
        this.chartType   = React.createRef();
        this.dataSources = React.createRef();
        this.bufferSize  = React.createRef();
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
            label      : label,
            chartType  : chartType,
            dataSources: dataSources,
            buffer     : bufferSize,
            id         : Math.random(),
        }

        return chart;
    }

    // Adiciona os dados do Chart no Banco de Dados, Atualiza o ID do Chart e
    // Adiciona na lista de charts.
    add: () => void = () => {
        if (this.isInputFieldsNull())
            throw Error("Invalid Input Fields");

        const chart = this.extractInputFields();

        this.props.addCallback(chart);
        this.hideModal();
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
                ref={this.label}
                />
            <Form.Text className="text-muted">
            Chart Label. Eg. Chart #1
            </Form.Text>

            <Form.Label>Chart Type</Form.Label>
            <select
                className="form-control"
                ref={this.chartType}>
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
                ref={this.dataSources}>
                <option value="Sensor #1">Sensor #1</option>
                <option value="Sensor #2">Sensor #2</option>
                <option value="Sensor #3">Sensor #3</option>
                <option value="Sensor #4">Sensor #4</option>
            </select>
            <Form.Text className="text-muted">
            Data Source to be ploted. Eg. Sensor #1, ...
            </Form.Text>

            <Form.Label>Buffer Size</Form.Label>
            <input
                type="number"
                placeholder="Buffer Size"
                className="form-control"
                ref={this.bufferSize}/>
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