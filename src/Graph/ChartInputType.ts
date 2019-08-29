
import {IDataSource} from "../Types/DataSourceType";

interface IData {
    x: Date|number;
    y: number;
}

export interface IChartInputType {
    dataSource: IDataSource;
    data: IData[],
}