/* -------------------------------------------------------------------------- */
/*                          Matheus Cândido Teixeira                          */
/*                                                                            */
/*                                 07/08/2019                                 */
/* -------------------------------------------------------------------------- */

import { IDataSource } from "./DataSourceType";

// Representa a interface para charts.
export interface IChart {
    id         : number;
    label      : string;
    buffer     : number;
    dataSources: IDataSource[];
    chartType  : string;
}