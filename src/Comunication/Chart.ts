import { IChart } from "../Types/ChartType";
import axios from "axios";

import * as mock from "../mock";

// const baseAddress = "http://localhost:5000";
const baseAddress = "";
/* ────────────────────────────────────────────────────────────────────────── */

export function fetchChart(id: number): Promise<IChart> {
    return (
        axios.get(baseAddress + "/api/charts/" + id, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "Accept"      : "application/json"
        }
    })
    .then(res => Promise.resolve(res.data))
    .catch(Promise.reject)
    );

    /*  return mock.charts.filter(
        chart => chart.id === id
    )[0]; */
}

// Busca todos as Charts que o usuário logado possui.
export function fetchAllCharts() : Promise<IChart[]> {
    return (
        axios.get(baseAddress + "/api/charts", {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "Accept"      : "application/json"
        }
    })
    .then(res => Promise.resolve(res.data as IChart[]))
    .catch(Promise.reject)
    );
}

// Cadastra um Chart no servidor. Retorna o Chart com o id modificado.
export function addChart(chart: IChart) : Promise<IChart> {
    delete chart.id; // Não é necessário possuir um ID.
    chart.dataSources.forEach(dataSource => dataSource.id);

    return (
    axios.post(baseAddress + "/api/charts", chart, {
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

// Atualiza os dados de um Chart específico.
export function updateChart(chart: Partial<IChart>) : Promise<IChart> {

    return (
    axios.put(baseAddress + `/api/charts/${chart.id}`, chart, {
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

// Deleta um chart do usuário.
export function deleteChart(id: number) : Promise<boolean> {
    return (
    axios.delete(baseAddress + `/api/charts/${id}`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    })
    .then(res => Promise.resolve(res.status === 200))
    .catch(Promise.reject)
    );
}