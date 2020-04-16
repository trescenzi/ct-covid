import { h } from "preact";
import { CSVPlot } from "./csv-plot.js";
import { useState } from "preact/hooks";

export function ChartWithScaleSelection({
  csv,
  xColumn = "Date",
  yColumns,
  chartOptions = {},
  layoutOptions = {},
}) {
  const [scale, setScale] = useState("linear");
  const [expanded, setExpanded] = useState(false);
  return (
    <div class={`chart-container ${expanded && "chart-container-full-screen"}`}>
      <div
        class="chart-container-expand"
        onclick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <img src="https://img.icons8.com/material/26/000000/collapse--v1.png" />
        ) : (
          <img src="https://img.icons8.com/material/24/000000/expand--v1.png" />
        )}
      </div>
      <div class="chart-container-title">{layoutOptions.title}</div>
      <div class="chart-container-header">
        <div
          class={`chart-container-tab ${scale === "linear" && "selected"}`}
          onclick={() => setScale("linear")}
        >
          Linear Scale
        </div>
        <div
          class={`chart-container-tab ${scale === "log" && "selected"}`}
          onclick={() => setScale("log")}
        >
          Log Scale
        </div>
      </div>
      <CSVPlot
        csv={csv}
        xColumn={xColumn}
        yColumns={yColumns}
        chartOptions={chartOptions}
        layoutOptions={{
          ...layoutOptions,
          legend: {
            x: 0,
            xanchor: "top",
            y: 1,
          },
          margin: {
            l: 40,
            r: 10,
            b: 30,
            t: 8,
            pad: 0,
          },
          title: "",
          yaxis: {
            ...layoutOptions.yaxis,
            type: scale,
            autorange: true,
          },
          xaxis: {
            ...layoutOptions.yaxis,
            tyle: scale,
            autorange: true,
          },
          height: expanded ? window.innerHeight - 100 : 390,
        }}
      />
    </div>
  );
}
