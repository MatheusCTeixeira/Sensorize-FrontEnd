import React from "react";
import DataSourceCard from "./DataSourceCard";
import DataSourcePrompt from "./DataSourceAddView";

import { IDataSource } from "../Types/DataSourceType";

import * as mock from "../mock";

// A interface IProps.
interface IProps {

}

// A interface IState.
interface IState extends IProps {
    dataSources: IDataSource[];
}

// Componente que encapsula tudo a respeito da Fonte de dados.
export default class DataSource extends React.Component<IProps, IState> {
    state: IState;

    constructor(props: IProps) {
        super(props);

        this.state = {
            dataSources: new Array<IDataSource>()
        };
    }

    componentDidMount = () => {
        this.setState( {
            dataSources: mock.dataSources,
        });
    }

    componentWillUnmount = () => {
        mock.dataSources.push(...this.state.dataSources);
    }

    // Adiciona uma nova Data Source.
    addDataSource = (dataSource: IDataSource) => {
        this.setState((state, props) => {
            // Acrescenta a Data Source e atualiza o estado.
            return {
                dataSources: [...state.dataSources, dataSource],
            } as IState;
        });
    }

    // Edita uma Data Source.
    editDataSource = (dataSource: IDataSource) => {
        this.setState((state, props) => {
            // Modica na lista de Data Sources a Data Source modificada.
            const editedDtSrc = state.dataSources.map(_dataSource => {
                if (_dataSource.id === dataSource.id) {
                    _dataSource = {..._dataSource, ...dataSource};
                }

                return _dataSource;
            });

            // Atualiza o estado.
            return {
                dataSources: editedDtSrc,
            } as IState;
        });
    }

    // Deleta uma Data Source.
    deleteDataSource = (dataSource: IDataSource) => {
        this.setState((state, props) => {
            // Filtra a Data Source especificada.
            const filtredDtSrc = state.dataSources.filter(_dataSource => (
                _dataSource.id !== dataSource.id
            ));

            // Atualiza o estado.
            return {
                dataSources: filtredDtSrc,
            } as IState;
        });
    }


    render() {
        return (
        <div>
            <DataSourcePrompt
                addCallback={this.addDataSource}
            />
            <div className="container">
                <div className="row-sm-6">
                    <div className="col">
                        { this.state.dataSources.map((dataSource, i) =>
                            <DataSourceCard
                                key={JSON.stringify(dataSource)}
                                dataSource={dataSource}
                                deleteCallback={this.deleteDataSource}
                                editCallback={this.editDataSource}
                            />)
                        }
                    </div>
                </div>
            </div>
        </div>);
    }
}