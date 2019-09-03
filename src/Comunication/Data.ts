import axios from "axios";

import { IDataSource } from "../Types/DataSourceType";
import { IChartInputType } from "../Types/ChartInputType";


class fetchData {

    static fetch(
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
                console.log("error");
                reject(err);
            });
        });
    }
}

export {
    fetchData,
};