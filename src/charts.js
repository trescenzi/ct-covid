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
        }}
      />
      <div class="subtext">No data available before 3/20</div>
    </div>
    <div>
      <${CSVPlot}
        csvName="hospitalizations"
        xColumn="Date"
        yColumns=${BY_COUNTY}
        layoutOptions=${{
          title: "Hospitalizations By County",
          showLegend: true,
        }}
      />
      <div class="subtext">No data available before 3/20</div>
    </div>
  </div>
`;
