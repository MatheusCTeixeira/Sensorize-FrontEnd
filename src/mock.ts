import { IChart } from "./Types/ChartType";
import { IDataSource } from "./Types/DataSourceType";

const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}

let dataSources: IDataSource[] = [
    {
        id       : 1,
        dataType : "Continuous",
        ipAddress: "127.0.0.1",
        port     : 3001,
        label    : "Sensor #1",
        sampleFrequency: 0.5,
    } as IDataSource,
    {
        id       : 2,
        dataType : "Discrete",
        ipAddress: "127.0.0.1",
        port     : 3002,
        label    : "Sensor #2",
        sampleFrequency: 1,
    } as IDataSource,
    {
        id       : 3,
        dataType : "Continuous",
        ipAddress: "127.0.0.1",
        port     : 3003,
        label    : "Sensor #3",
        sampleFrequency: 1,
    } as IDataSource,
    {
        id       : 4,
        dataType : "Discrete",
        ipAddress: "127.0.0.1",
        port     : 3004,
        label    : "Sensor #4",
        sampleFrequency: 4,
    } as IDataSource,
];

let charts: IChart[] = [
    {
        id: 1,
        buffer: 70,
        chartType: "Line Chart",
        label: "Temperature Scale (ºC)",
        dataSources: [
            dataSources[0],
            dataSources[1],
            dataSources[2],
        ]
    } as IChart,
    {
        id: 2,
        buffer: 10,
        chartType: "Bar Chart",
        label: "Chart #2",
        dataSources: [
            dataSources[0],
            dataSources[1],
            dataSources[2],
        ]
    } as IChart,
    {
        id: 3,
        buffer: 50,
        chartType: "Scatter Plot",
        label: "Radioactivity (Bq)",
        dataSources: [
            dataSources[0],
            dataSources[1],
            dataSources[2],
        ]
    } as IChart,
    {
        id: 4,
        buffer: 10,
        chartType: "Pie Chart",
        label: "Disk Storage Space (GB)",
        dataSources: [
            dataSources[0],
            dataSources[1],
            dataSources[2],
        ]
    } as IChart,
];

export { charts, dataSources };