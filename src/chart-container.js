import { CSVPlot } from "./csv-plot.js";
import { useState } from "preact/hooks";
import { html } from "htm/preact";

export function ChartWithScaleSelection({
  csvName,
  xColumn = "Date",
  yColumns,
  chartOptions = {},
  layoutOptions = {},
}) {
  const [scale, setScale] = useState("linear");
  const [expanded, setExpanded] = useState(false);
  return html`
    <div
      class=${`chart-container ${expanded && "chart-container-full-screen"}`}
    >
      <div class="chart-container-header">
        <div
          class=${`chart-container-tab ${scale === "linear" && "selected"}`}
          onclick=${() => setScale("linear")}
        >
          Linear Scale
        </div>
        <div
          class=${`chart-container-tab ${scale === "log" && "selected"}`}
          onclick=${() => setScale("log")}
        >
          Log Scale
        </div>
        <div
          class=${`chart-container-tab`}
          onclick=${() => setExpanded(!expanded)}
        >
          ${expanded ? "Close Full Screen" : "Show Full Screen"}
        </div>
      </div>
      <${CSVPlot}
        csvName=${csvName}
        xColumn=${xColumn}
        yColumns=${yColumns}
        chartOptions=${chartOptions}
        layoutOptions=${{
          ...layoutOptions,
          yaxis: {
            ...layoutOptions.yaxis,
            type: scale,
            autorange: true,
          },
          height: expanded ? window.innerHeight : 450,
        }}
      />
    </div>
  `;
}
