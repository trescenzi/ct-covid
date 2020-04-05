<svelte:head>
  <script src="https://cdn.plot.ly/plotly-latest.min.js" type="text/javascript"></script>
</svelte:head>

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
  import { onMount } from 'svelte';
  import townCases from './data/town-cases.csv'
  import townGeoJson from '../../static/ct-towns.json';
  import Loader from '../components/Loader.svelte';
  const [locations, z] = townCases.reduce(([locations, z], {Town, Cases}) =>
    [[...locations, Town], [...z, Cases]], [[],[]]);
  let loading = true;
  let plot;
  export let data = [{
    style: 'light',
    type: 'choropleth',
    name: 'CT Towns',
    geojson: townGeoJson,
    locations,
    z,
  }];

  const layout = {
    geo: {
      fitbounds: 'locations',
      visible: false,
    }
  }

  onMount(() => {
    let Plot = new Plotly.newPlot(plot, data, layout, {
      displayModeBar: false,
      responsive: true
    }).then(() => setTimeout(() => loading = false, 100
    /*there's some wonkiness still going on after it loads so give it a bit to normalize*/
    ));
  });
</script>

<div class="container">
  {#if loading}
    <Loader />
  {/if}
  <div class:hidden={loading} bind:this={plot} />
</div>
