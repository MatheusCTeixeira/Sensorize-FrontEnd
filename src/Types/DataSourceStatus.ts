
export enum EStatus { On = "On", Off = "Off"};

export interface IDataSourceStatus {
    uptime: Date;
    sensorStatus: EStatus; // On, Off
    requestPerHour: number;
}