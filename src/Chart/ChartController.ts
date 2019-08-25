import React from "react";

import { IChart } from "../Types/ChartType";
import { IDataSource } from "../Types/DataSourceType";

import * as mock from "../mock";

export class ChartController {
    label      : React.RefObject<HTMLInputElement> ;
    chartType  : React.RefObject<HTMLSelectElement>;
    dataSources: React.RefObject<HTMLSelectElement>;
    bufferSize : React.RefObject<HTMLInputElement> ;

    constructor() {
        this.label       = React.createRef();
        this.chartType   = React.createRef();
        this.dataSources = React.createRef();
        this.bufferSize  = React.createRef();
    }

    findDataSourceById = (id: number) => {
        return {
            id: id,
            label: `Sensor #${id}`
        } as IDataSource;
    }

    checkForNullInputs = () => {
        return !(
            this.label.current       != null &&
            this.chartType.current   != null &&
            this.dataSources.current != null &&
            this.bufferSize.current  != null
        );
    }

    readInput = () => {
        const label       = this.label.current.value;
        const chartType   = this.chartType.current.value;
        const bufferSize  = parseInt(this.bufferSize.current.value);
        const dataSources = (
            Array.from(this.dataSources.current.selectedOptions).map(
                _ => parseInt(_.value)
            ));

        const chart: IChart = {
            id         : null,
            label      : label,
            chartType  : chartType,
            dataSources: dataSources.map(_ => this.findDataSourceById(_)),
            buffer     : bufferSize,
        };

        return chart;
    }

    fetchAllDataSources = () => {
        return mock.dataSources;
    }



}