<script>
  import CsvPlot from '../components/csv-plot.svelte';
  import RatePlot from '../components/rate-plot.svelte';
  import deaths from './data/deaths.csv';
  import {BY_COUNTY} from '../constants';
</script>

<h1>Death Statistics</h1>
<div class="container">
  <CsvPlot
    yColumns={['Overall']} 
    data={deaths}
    xColumn='Date'
    layout={{ title: 'Total Deaths', }}
  />
  <CsvPlot
    yColumns={BY_COUNTY} 
    data={deaths}
    xColumn='Date'
    layout={{ title: 'Deaths by County', }}
  />
  <RatePlot
    yColumn='Overall'
    data={deaths}
    xColumn='Date'
    layout={{ title: 'Rate of Increase by Day', }}
  />
</div>
