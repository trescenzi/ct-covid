<script>
  import CsvPlot from '../components/csv-plot.svelte';
  import RatePlot from '../components/rate-plot.svelte';
  import hospitalizations from './data/hospitalizations.csv';
  import {BY_COUNTY} from '../constants';
</script>

<h1>Hospitalization Statistics</h1>
<div class="container">
  <CsvPlot
    yColumns={['Overall']} 
    data={hospitalizations}
    xColumn='Date'
    layout={{ title: 'Total Hospitalizations', }}
  />
  <CsvPlot
    yColumns={BY_COUNTY} 
    data={hospitalizations}
    xColumn='Date'
    layout={{ title: 'Hospitalizations by County', }}
  />
  <RatePlot
    yColumn='Overall'
    data={hospitalizations}
    xColumn='Date'
    layout={{ title: 'Rate of Increase by Day', }}
  />
</div>
