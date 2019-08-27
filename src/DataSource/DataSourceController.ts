import React from "react";

import { IDataSource } from "../Types/DataSourceType";

/* ────────────────────────────────────────────────────────────────────────── */

export class DataSourceController {
    ipAddress      : React.RefObject<HTMLInputElement>;
    port           : React.RefObject<HTMLInputElement>;
    label          : React.RefObject<HTMLInputElement>;
    dataType       : React.RefObject<HTMLInputElement>;
    sampleFrequency: React.RefObject<HTMLInputElement>;

    constructor() {
        this.ipAddress       = React.createRef();
        this.port            = React.createRef();
        this.label           = React.createRef();
        this.dataType        = React.createRef();
        this.sampleFrequency = React.createRef();
    }

    // Testa se há referências não atribuídas.
    checkForNullInputs = () => {
        return !(
            this.ipAddress       != null &&
            this.port            != null &&
            this.label           != null &&
            this.dataType        != null &&
            this.sampleFrequency != null
        );
    }

    // Lê os campos e retorna um objeto DataSource.
    readInput = () => {
        const ipAddress       = this.ipAddress.current.value;
        const port            = this.port.current.value;
        const label           = this.label.current.value;
        const dataType        = this.dataType.current.value;
        const sampleFrequency = this.sampleFrequency.current.value;

        const dataSource: IDataSource = {
            id             : null,
            ipAddress      : ipAddress,
            port           : parseInt(port),
            label          : label,
            dataType       : dataType,
            sampleFrequency: parseInt(sampleFrequency),
        };

        return dataSource;
    }
}