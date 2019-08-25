import { IChart } from "../Types/ChartType";

import * as mock from "../mock";

function fetchChart(id: number):IChart {
    return mock.charts.filter(
        chart => chart.id === id
    )[0];
}

function fetchAllChart():IChart[] {
    return mock.charts;
}

function addChart(chart: IChart): boolean {
    return false;
}

function updateChart(chart: IChart): boolean {
    return false;
}

function deleteChart(chart: IChart): boolean {
    return false;
}

export {
    fetchChart, fetchAllChart,
    addChart,
    updateChart,
    deleteChart,
};