<style>
  .container {
    height: 600px;
    position: relative;
  }
  .hidden {
    visibility: hidden;
  }
</style>

<script>
  import PlotlyPlot from '../components/plotly-plot.svelte';
  import townCases from './data/town-cases.csv'
  import townGeoJson from '../../static/ct-towns.json';
  const [townLocations, townZ] = townCases.reduce(([locations, z], {Town, Cases}) =>
    [[...locations, Town], [...z, Cases]], [[],[]]);
  export let townData = [{
    style: 'light',
    type: 'choropleth',
    name: 'CT Towns',
    geojson: townGeoJson,
    locations: townLocations,
    z: townZ,
  }];

  const layout = {
    geo: {
      fitbounds: 'locations',
      visible: false,
    }
  }

  const config = {
    displayModeBar: false,
    responsive: true
  };
</script>

<h1>Cases by Town</h1>
<PlotlyPlot
  data={townData}
  layout={layout}
  config={config}
/>
