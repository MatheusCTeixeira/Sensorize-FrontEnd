import axios from "axios";

import { IDataSource } from "../Types/DataSourceType";
import { IChartInputType } from "../Types/ChartInputType";
import { IDataSourceStatus } from "../Types/DataSourceStatus";


class fetch {
    // Busca o dados de uma Data Source específica.
    static data(
        dataSource: IDataSource,
        lastSampleTime: Date = new Date())
        : Promise<IChartInputType> {

        const lastRequest = lastSampleTime;
        const ip = dataSource.ipAddress;
        const port = dataSource.port
        const url = `http://${ip}:${port}/data/${lastRequest}`;

        return new Promise((resolve, reject) => {
            axios.get(url)
            .then((response) => {
                resolve({
                    dataSource: dataSource,
                    data: response.data,
                } as IChartInputType);
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    static status(
        dataSource: IDataSource)
        : Promise<IDataSourceStatus> {

        const ip = dataSource.ipAddress;
        const port = dataSource.port
        const url = `http://${ip}:${port}/status`;

        return new Promise((resolve, reject) => {
            axios.get(url)
            .then((response) => {
                const data = response.data as IDataSourceStatus;
                data.uptime = new Date(data.uptime);
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
        });
    }
}

export {
    fetch,
};