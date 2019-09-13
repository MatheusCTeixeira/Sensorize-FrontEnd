import { IChart } from "../Types/ChartType";
import axios from "axios";

import * as mock from "../mock";

/* ────────────────────────────────────────────────────────────────────────── */

export function fetchChart(id: number):IChart {
    return mock.charts.filter(
        chart => chart.id === id
    )[0];
}

// Busca todos as Charts que o usuário logado possui.
export function fetchAllChart() : Promise<IChart[]> {
    return (
        axios.get("/api/charts", {
        headers: {
            "Content-Type": "application/json",
            "Accept"      : "application/json"
        }
    })
    .then(res => Promise.resolve(JSON.parse(res.data)))
    .catch(Promise.reject)
    );
}

// Cadastra um Chart no servidor. Retorna o Chart com o id modificado.
export function addChart(chart: IChart) : Promise<IChart> {
    delete chart.id; // Não é necessário possuir um ID.
    chart.dataSources.forEach(dataSource => dataSource.id);

    return (
    axios.post("/api/charts", chart, {
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
    axios.put(`/api/charts/${chart.id}`, chart, {
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
    axios.delete(`/api/charts/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    })
    .then(res => Promise.resolve(res.status === 200))
    .catch(Promise.reject)
    );
}