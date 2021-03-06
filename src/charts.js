import { Fragment, h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { ChartWithScaleSelection } from "./chart-container.js";
import { RateOfGrowthCSVChart } from "./csv-plot.js";
import { fetchDataSet } from "./csv.js";

const BY_COUNTY = [
  "Fairfield",
  "Hartford",
  "Litchfield",
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
const deathJumpAnnotation = {
  xref: "paper",
  yref: "paper",
  x: 0.5,
  y: -0.1,
  xanchor: "center",
  yanchor: "top",
  text: "3/31 has 17 additional deaths from prior days.",
  showarrow: false,
  font: {
    family: "Arial",
    size: 8,
    color: "rgb(150,150,150)",
  },
};

function fetchCSVs() {
  return Promise.all([fetchDataSet("STATE"), fetchDataSet("COUNTY")]);
}

const ChartsByDate = ({ data }) => (
  <div class="charts">
    <ChartWithScaleSelection
      csv={data.state}
      xColumn="date"
      yColumns={["cases"]}
      layoutOptions={{
        title: "Total Cases",
        showLegend: true,
      }}
    />
    <ChartWithScaleSelection
      csv={data.county.cases}
      xColumn="date"
      yColumns={BY_COUNTY}
      layoutOptions={{
        title: "Cases by county",
        showLegend: true,
        xaxis: {
          title: {
            text: "date",
          },
        },
      }}
    />
    <ChartWithScaleSelection
      csv={data.state}
      xColumn="date"
      yColumns={["deaths"]}
      layoutOptions={{
        title: "Total Deaths",
        showLegend: true,
        annotations: [deathJumpAnnotation],
      }}
    />
    <ChartWithScaleSelection
      csv={data.county.deaths}
      xColumn="date"
      yColumns={BY_COUNTY}
      layoutOptions={{
        title: "Deaths By County",
        showLegend: true,
        annotations: [deathJumpAnnotation],
      }}
    />
    <ChartWithScaleSelection
      csv={data.state}
      xColumn="date"
      yColumns={["hospitalizations"]}
      layoutOptions={{
        title: "Total Hospitalizations",
        showLegend: true,
        annotations: [missingDataAnnotation],
      }}
    />
    <ChartWithScaleSelection
      csv={data.county.hospitalizations}
      xColumn="date"
      yColumns={BY_COUNTY}
      layoutOptions={{
        title: "Hospitalizations By County",
        showLegend: true,
        annotations: [missingDataAnnotation],
      }}
    />
  </div>
);

const RateCharts = ({ data }) => (
  <>
    <div class="rate-header">
      These charts show the rate at which cases are being added on a log scale.
      Inspired by
      <a
        rel="noopener"
        target="_blank"
        href="https://www.youtube.com/watch?v=54XLXg4fYsc"
      >
        {" "}
        Minute Physics
      </a>
      . When they no longer point up and to the right it's an indicator that
      preventative measures are working. If they are flat it means that the
      tracked statistic isn't increasing exponentially. Gaps are due to there
      being no reported change. The per county charts are very messy. You can
      double click on a county in the chart legend to only show that county.
      Given that there's not a ton of data yet these are currently all tracking
      the daily increase, not weekly as done in the video.
    </div>
    <div class="charts">
      <RateOfGrowthCSVChart
        csv={data.state}
        yColumns={["cases"]}
        layoutOptions={{
          title: "Rate of Cases",
        }}
      />
      <RateOfGrowthCSVChart
        csv={data.county.cases}
        yColumns={BY_COUNTY}
        layoutOptions={{
          title: "Rate of Cases By County",
        }}
      />
    </div>
  </>
);

export const Charts = () => {
  const [data, setState] = useState({ state: [], county: {} });
  const [showDayCharts, setShowDateCharts] = useState(true);
  useEffect(() => {
    fetchCSVs().then(([state, county]) => {
      setState({
        state,
        county,
      });
    });
  }, []);
  return (
    <>
      <div class="charts-container-header">
        <div
          class={`chart-container-tab ${showDayCharts && "selected"}`}
          onclick={() => setShowDateCharts(true)}
        >
          Data By Day
        </div>
        <div
          class={`chart-container-tab ${!showDayCharts && "selected"}`}
          onclick={() => setShowDateCharts(false)}
        >
          Rates of Growth
        </div>
      </div>
      {showDayCharts ? (
        <ChartsByDate data={data} />
      ) : (
        <RateCharts data={data} />
      )}
    </>
  );
};
