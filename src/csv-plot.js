import { Plot } from "./preact-plotly.js";
import { LoadingSpinner } from "./loading.js";
import { fetchCSV } from "./csv.js";
import { useEffect, useState } from "preact/hooks";
import { Fragment } from "preact";
import { html } from "htm/preact";

const options = {
  displayModeBar: false,
  responsive: true,
};
const colors2 = [
  "#032980",
  "#804392",
  "#c76ca1",
  "#ffa1b4",
  "#ffa592",
  "#ffb767",
  "#ffd43f",
];
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
  return html`
    <${Fragment}>
      ${
        !chartData
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
