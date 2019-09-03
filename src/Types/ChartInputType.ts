
import {IDataSource} from "./DataSourceType";

export interface IData {
    x: Date | number | string;
    y: number;
}

export interface IChartInputType {
    dataSource: IDataSource;
    data: IData[],
}