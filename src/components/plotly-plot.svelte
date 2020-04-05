<svelte:head>
  <script src="//cdn.plot.ly/plotly-latest.min.js" type="text/javascript"></script>
</svelte:head>

<style>
  .container {
    height: 450px;
    width: 56em;
    position: relative;
  }
  .hidden {
    visibility: hidden;
  }

  @media (max-width: 450px) {
    .container {
      width: 350px;
    }
  }

  @media (max-width: 750px) {
    .container {
      width: 650px;
    }
  }
</style>

<script>
  import { onMount } from 'svelte';
  import Loader from './Loader.svelte';
  export let data;
  export let layout;
  export let config;
  let loading = true;
  let plot;
  onMount(() => {
    plot = new Plotly.newPlot(plot, data, layout, config).then(() => setTimeout(() => loading = false, 100
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
