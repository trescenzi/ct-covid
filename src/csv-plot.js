import { Plot } from "./preact-plotly.js";
import { LoadingSpinner } from "./loading.js";
import { fetchCSV } from "./csv.js";
import { useEffect, useState } from "preact/hooks";
import { html } from "htm/preact";

const options = {
  displayModeBar: false,
  responsive: true,
};
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
        yColumns.map((columnName) => ({
          x: data.map((row) => row[xColumn]),
          y: data.map((row) => row[columnName]),
          name: columnName,
          type: "line",
        }))
      )
    );
  }, []);
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
