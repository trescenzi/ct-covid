import { Plot } from "./preact-plotly.js";
import { LoadingSpinner } from "./loading.js";
import { fetchCSV } from "./csv.js";
import { useEffect, useState } from "preact/hooks";
import { html } from "htm/preact";

const options = {
  displayModeBar: false,
  responsive: true,
};
const colors = [
  "rgba(3, 41, 128, 1)",
  "rgba(131, 72, 143, 1)",
  "rgba(198, 122, 160, 1)",
  "rgba(246, 182, 189, 1)",
  "rgba(255, 180, 158, 1)",
  "rgba(255, 190, 112, 1)",
  "rgba(255, 212, 63, 1)",
];
const colors2 = [
  "#032980",
  "#804392",
  "#c76ca1",
  "#ffa1b4",
  "#ffa592",
  "#ffb767",
  "#ffd43f",
];
console.log("colors", colors);
export function CSVPlot({
  csvName,
  xColumn = "Date",
  yColumns,
  chartOptions = {},
  layoutOptions = {},
}) {
  const [chartData, setState] = useState();
  useEffect(() => {
    fetchCSV(csvName).then(({ data }) =>
      setState(
        yColumns.map((columnName, i) => ({
          x: data.map((row) => row[xColumn]),
          y: data.map((row) => row[columnName]),
          name: columnName,
          type: "scatter",
          mode: "lines",
          line: {
            color: colors2[i],
          },
        }))
      )
    );
  }, []);
  console.log(chartData);
  return html`
    <div class="chart-container">
      ${!chartData
        ? html`<${LoadingSpinner} />`
        : html`<${Plot}
            data=${chartData}
            layout=${layoutOptions}
            options=${{
              ...options,
              ...chartOptions,
            }}
          />`}
    </div>
  `;
}
