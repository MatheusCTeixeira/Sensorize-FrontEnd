/* -------------------------------------------------------------------------- */
/*                          Matheus Cândido Teixeira                          */
/*                                                                            */
/*                                 07/08/2019                                 */
/* -------------------------------------------------------------------------- */

// Representa a interface para charts.
export interface IChart {
    id         : number,
    label      : string,
    buffer     : number,
    dataSources: string[],
    chartType  : string,
}