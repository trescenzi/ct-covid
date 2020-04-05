<script>
  import CsvPlot from '../components/csv-plot.svelte';
  import RatePlot from '../components/rate-plot.svelte';
  import cases from './data/cases.csv';
  import {BY_COUNTY} from '../constants';
</script>

<h1>Case Statistics</h1>
<div class="container">
  <CsvPlot
    yColumns={['Overall']} 
    data={cases}
    xColumn='Date'
    layout={{ title: 'Total Cases', }}
  />
  <CsvPlot
    yColumns={BY_COUNTY} 
    data={cases}
    xColumn='Date'
    layout={{ title: 'Cases by County', }}
  />
  <RatePlot
    yColumn='Overall'
    data={cases}
    xColumn='Date'
    layout={{ title: 'Rate of Increase by Day', }}
  />
</div>
