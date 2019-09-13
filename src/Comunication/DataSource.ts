import axios from "axios";

import { IDataSource } from "../Types/DataSourceType";

/* ────────────────────────────────────────────────────────────────────────── */

// Para propósitos de teste apenas.
const baseAddr = "http://localhost:5000";

// Busca os dados de uma Data Source específica.
export function fetchDataSource(id: number): Promise<IDataSource> {
    return (
    axios.get(`/api/datasources/${id}`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "Accept"      : "application/json",
        }
    })
    .then(res => Promise.resolve(res.data))
    .catch(Promise.reject)
    );
}

// Busca os dados de todas as Data Sources relacionadas com o usuário logado.
export function fetchAllDataSources() : Promise<any> {

    return axios.get(baseAddr + `/api/datasources/`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "Accept"      : "application/json",
        }
    }).then(res => Promise.resolve(res.data))
    .catch(Promise.reject);
}

// Adiciona a Data Source. Retorna a Data Source com o ID válido.
export function addDataSource(dataSource: IDataSource) : Promise<IDataSource> {
    delete dataSource.id;
    return (
    axios.post(baseAddr + `/api/datasources/`, dataSource, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    })
    .then(res => Promise.resolve(res.data))
    .catch(Promise.reject)
    );
}

// Edita os dados da Data Source específicada.
export function updateDataSource
    (dataSource: Partial<IDataSource>)
    : Promise<IDataSource> {

    return (
    axios.put(baseAddr + `/api/datasources/${dataSource.id}`, dataSource, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    })
    .then(res => Promise.resolve(res.data))
    .catch(Promise.reject)
    );
}

// Remove a Data Source que possui ID específicado.
export function deleteDataSource(id: number): Promise<boolean> {
    return (
    axios.delete(baseAddr + `/api/datasources/${id}`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "Accept"      : "application/json",
        }
    })
    .then(res => Promise.resolve(res.status === 200))
    .catch(Promise.reject)
    );
}
