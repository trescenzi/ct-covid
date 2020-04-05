<script>
  import PlotlyPlot from './plotly-plot.svelte';
  import zipWith from "lodash-es/zipWith.js";
  import {CHART_COLORS as colors} from '../constants.js';
  export let data = [];
  export let xColumn = 'Date';
  export let yColumn;
  export let config = {};
  export let layout = {};

  $: processedData = [yColumn].map((columnName, i) => {
    const values = data.map((row) => row[columnName]);
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
      line: {
        color: colors[i],
      },
    };
  });
  $: processedLayout = {
    ...layout,
    yaxis: {
      ...layout.yaxis,
      type: "log",
      autorange: true,
      title: "Increase from Previous Day",
    },
    xaxis: {
      ...layout.xaxis,
      type: "log",
      autorange: true,
      title: `Total Number`,
    },
  };
  $: processedConfig = {
    displayModeBar: false,
    responsive: true,
    ...config,
  }
</script>

<PlotlyPlot
  data={processedData}
  layout={processedLayout}
  config={processedConfig}
/>
