import React, { Component } from "react"             ;
import DataSourceDelete     from "./DataSourceDelete";
import DataSourceEdit       from "./DataSourceEdit"  ;
import DataSourceTest       from "./DataSourceTest"  ;

import { IDataSource } from "../Types/DataSourceTypes";

// A interface IProps.
interface IProps {
    dataSource: IDataSource;

    editCallback: (dataSource: IDataSource) => any;
    deleteCallback: (dataSource: IDataSource) => any;
}

// A interface IState.
interface IState extends IProps {

}

// Cria um Card para cada Fonte de Dados cadastrada.
export default class DataSourceCard extends Component<IProps, IState> {
    state: IState;

    constructor(props: IProps) {
        super(props);
        this.state = { ...props};
    }

    public render() {
        return (
        <div className="card m-4 datasource-card">
            <h5 className="card-header">{this.state.dataSource.label}</h5>
            <div className="card-body">
                <h5 className="card-title">Data Source features:</h5>
                <div className="card-text w-100">
                    <table className="datasource-features">
                        <tbody>
                        <tr>
                            <td>IP Address</td>
                            <td>{this.state.dataSource.ipAddress}</td>
                        </tr>
                        <tr>
                            <td>Port</td>
                            <td>{this.state.dataSource.port}</td>
                        </tr>
                        <tr>
                            <td>Data Type</td>
                            <td>{this.state.dataSource.dataType}</td>
                        </tr>
                        <tr>
                            <td>Sample Frequency</td>
                            <td>{this.state.dataSource.sampleFrequency}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <DataSourceDelete
                    dataSource={this.state.dataSource}
                    deleteCallback={this.props.deleteCallback}
                />

                <DataSourceEdit
                    dataSource={this.state.dataSource}
                    editCallback={this.props.editCallback}
                />

                <DataSourceTest
                    dataSource={this.state.dataSource}
                />

            </div>
        </div>);
    }
}