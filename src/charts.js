import { html } from "htm/preact";
import { CSVPlot } from "./csv-plot.js";

const OVERALL = ["Overall"];
const BY_COUNTY = [
  "Fairfield",
  "Hartford",
  "New Haven",
  "New London",
  "Middlesex",
  "Tolland",
  "Windham",
];

const missingDataAnnotation = {
  xref: "paper",
  yref: "paper",
  x: 0.5,
  y: -0.1,
  xanchor: "center",
  yanchor: "top",
  text: "No data available before 3/20",
  showarrow: false,
  font: {
    family: "Arial",
    size: 8,
    color: "rgb(150,150,150)",
  },
};
export const Charts = () => html`
  <div class="charts">
    <${CSVPlot}
      csvName="cases"
      xColumn="Date"
      yColumns=${OVERALL}
      layoutOptions=${{
        title: "Total Cases",
        showLegend: true,
      }}
    />
    <${CSVPlot}
      csvName="cases"
      xColumn="Date"
      yColumns=${BY_COUNTY}
      layoutOptions=${{
        title: "Cases by county",
        showLegend: true,
        xaxis: {
          title: {
            text: "date",
          },
        },
      }}
    />
    <${CSVPlot}
      csvName="deaths"
      xColumn="Date"
      yColumns=${OVERALL}
      layoutOptions=${{
        title: "Total Deaths",
        showLegend: true,
      }}
    />
    <${CSVPlot}
      csvName="deaths"
      xColumn="Date"
      yColumns=${BY_COUNTY}
      layoutOptions=${{
        title: "Deaths By County",
        showLegend: true,
      }}
    />
    <div>
      <${CSVPlot}
        csvName="hospitalizations"
        xColumn="Date"
        yColumns=${OVERALL}
        layoutOptions=${{
          title: "Total Hospitalizations",
          showLegend: true,
          annotations: [missingDataAnnotation],
        }}
      />
    </div>
    <div>
      <${CSVPlot}
        csvName="hospitalizations"
        xColumn="Date"
        yColumns=${BY_COUNTY}
        layoutOptions=${{
          title: "Hospitalizations By County",
          showLegend: true,
          annotations: [missingDataAnnotation],
        }}
      />
    </div>
  </div>
`;
