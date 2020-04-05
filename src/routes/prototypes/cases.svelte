<style>
  .container {
    height: 500px;
  }
</style>

<script>
  import Plot from '../../components/plot.svelte';
  import cases from '../data/cases.csv';
  import {processCSV} from '../data/_process_csv.js';
  const {data, xLabels} = processCSV(cases, 'Date');
  const truncatedXLabels = xLabels.map(label => label.split('-').slice(1,3).join('-'))
  const overall = data.filter(({name}) => name === 'Overall');
</script>

<div class="container">
  <Plot
    x1={0}
    y1={0}
    x2={xLabels.length}
    xLabels={truncatedXLabels}
    data={overall}
  />
</div>

<div class="container">
  <Plot
    x1={0}
    y1={0}
    x2={xLabels.length - 1}
    xLabels={truncatedXLabels}
    data={data.filter(({name}) => name !== 'Overall')} 
  />
</div>
