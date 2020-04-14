import { Plot } from "./preact-plotly.js";
import { LoadingSpinner } from "./loading.js";
import { Fragment } from "preact";
import { html } from "htm/preact";
import zipWith from "lodash-es/zipWith.js";

const options = {
  displayModeBar: false,
  responsive: true,
};
const colors2 = [
  "#032980",
  "#6b3f90",
  "#804392",
  "#c76ca1",
  "#ffa1b4",
  "#ffa592",
  "#ffb767",
  "#ffd43f",
];
export function CSVPlot({
  csv,
  xColumn = "date",
  yColumns,
  chartOptions = {},
  layoutOptions = {},
}) {
  const chartData =
    csv &&
    yColumns.map((columnName, i) => ({
      x: csv.map((row) => row[xColumn]),
      y: csv.map((row) => row[columnName]),
      name: columnName,
      type: "scatter",
      mode: "lines",
      line: {
        color: colors2[i],
      },
    }));

  return html`
    <${Fragment}>
      ${
        !csv
          ? html`<${LoadingSpinner} />`
          : html`<${Plot}
              data=${chartData}
              layout=${layoutOptions}
              options=${{
                ...options,
                ...chartOptions,
              }}
            />`
      }
    </${Fragment}>
  `;
}

export function RateOfGrowthCSVChart({
  csv,
  yColumns,
  chartOptions = {},
  layoutOptions = {},
}) {
  const chartData =
    csv &&
    yColumns.map((columnName, i) => {
      const values = csv.map((row) => row[columnName]);
      const rateOfChange = zipWith(
        values,
        [0, ...values],
        (current, previous) => current - previous
      )
        .slice(0, -1)
        .map((value) => (value === 0 ? undefined : value));
      return {
        x: values,
        y: rateOfChange,
        name: columnName,
        type: "scatter",
        mode: "lines",
        connectGaps: true,
        line: {
          color: colors2[i],
        },
      };
    });

  return html`
    <div class="chart-container">
      <div class="chart-container-title">
        ${layoutOptions.title}
      </div>
      <div class="chart-container-header" />
      ${!csv
        ? html`<${LoadingSpinner} />`
        : html`<${Plot}
            data=${chartData}
            layout=${{
              ...layoutOptions,
              title: "",
              legend: {
                x: 0,
                xanchor: "top",
                y: 1,
              },
              margin: {
                l: 40,
                r: 10,
                b: 30,
                t: 0,
                pad: 0,
              },
              height: 390,
              yaxis: {
                ...layoutOptions.yaxis,
                type: "log",
                autorange: true,
                title: "Increase from Previous Day",
              },
              xaxis: {
                ...layoutOptions.xaxis,
                type: "log",
                autorange: true,
                title: "Total Number of Cases",
              },
            }}
            options=${{
              ...options,
              ...chartOptions,
            }}
          />`}
    </div>
  `;
}
