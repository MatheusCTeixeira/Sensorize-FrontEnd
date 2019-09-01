import React from "react";

import { RegressionChart } from "./RegressionChart";
import { IChartInputType } from "./ChartInputType";
import { dataSources } from "../mock";

/**
 * subscription é o método para obter dados do outro componente de tal forma
 * que projeto não necessite realizar requisições desnecessárias as Data Source.
 */
interface IProps {
    subscripton: (callback: (data: IChartInputType) => any) => any;
}

/**
 * dataSourcesData são todos as Data Source participantes deste Chart.
 */
interface IState extends IProps {
    dataSourcesData: IChartInputType[];
}

export class Statistic extends React.Component<IProps, IState> {
    state: IState;

    constructor(props: IProps) {
        super(props);

        this.state = {
            ...props,
            dataSourcesData: new Array<IChartInputType>()
        };
    }

    componentDidMount = () => {
        this.props.subscripton(this.storeData);
    }

    /**
     * Esta função é cadastrada em subscription. Ela rebece os dados e os agrupa
     * em um buffer. Cada buffer armazena dados de uma Data Source específica.
    */
    storeData = (data: IChartInputType) => {
        /**
         * Caso a fonte de dados ainda não esteja cadastrada/adicionada,
         * adicione-a.
         */
        if (this.state.dataSourcesData.findIndex(
            dt => dt.dataSource.id === data.dataSource.id) < 0) {
            this.setState((state, props) => { return {
                dataSourcesData: [...state.dataSourcesData, data]
            }});
        }

        /**
         * Acumule o dado recebido no buffer da fonte de dados correspondente.
         * Esses dados não podem ser descatados por devem ser utilizados para
         * realizar calculos estatísticos.
         */
        this.state.dataSourcesData.forEach((dt => {
            if (dt.dataSource.id === data.dataSource.id) {
                dt.data.push(...data.data);
            }
        }));
    }

    addRegression = () => this.state.dataSourcesData.map((dataSource, i) => (
        <div className="col-6">
            <RegressionChart
                key={i}
                data={this.state.dataSourcesData[i]}
                width={"100%"}
                height={"450px"}
            />
        </div>
    ));

    render = () => {
        if (this.state.dataSourcesData.length < 2) return null;
        return (
        <div className="container mt-5">
            <h3 className="text-primary">Statistics</h3>
            <div className="row">
                {this.addRegression()}
            </div>
        </div>)
    }
}