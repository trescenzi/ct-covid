<script>
  import PlotlyPlot from './plotly-plot.svelte';
  import {CHART_COLORS as colors} from '../constants.js';
  export let data = [];
  export let xColumn = 'Date';
  export let yColumns = [];
  export let config = {};
  export let layout = {};

  $: processedData = yColumns.map((columnName, i) => ({
    x: data.map((row) => row[xColumn]),
    y: data.map((row) => row[columnName]),
    name: columnName,
    type: "scatter",
    mode: "lines",
    line: {
      color: colors[i],
    },
  }));
  $: processedLayout = {
    showLegend: true,
    ...layout,
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
