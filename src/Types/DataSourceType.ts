/* -------------------------------------------------------------------------- */
/*                          Matheus Cândido Teixeira                          */
/*                                                                            */
/*                                 07/08/2019                                 */
/* -------------------------------------------------------------------------- */

// Representa a interface para Fonte de dados.
export interface IDataSource {
    id             : number;
    ipAddress      : string;
    port           : number;
    label          : string;
    dataType       : string;
    sampleFrequency: number;
};
