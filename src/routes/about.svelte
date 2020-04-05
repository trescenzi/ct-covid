<svelte:head>
	<title>About</title>
</svelte:head>

<script>
  import {UPDATE_DATE} from '../constants.js';
</script>

<style>
  h2 {
    margin-bottom: 0;
  }

  .data-source {
    margin-bottom: 16px;
  }

  .about-container {
    padding: 1em;
  }
</style>

<div class="about-container">
  <h1>
    Connecticut Covid-19 Statistics
  </h1>
  <div class="data-source">
    <h2>
      Data Updated {UPDATE_DATE.toLocaleDateString()}
    </h2>
    <div>
      For official information & data visit
      <a rel="noopener" target="_blank" href="https://portal.ct.gov/Coronavirus">
        ct.gov/Coronavirus
      </a>
    </div>
  </div>
  <h3>How to Use</h3>
  <ul>
    <li>Hover, or tap on, lines to view specific data points.</li>
    <li>
      Turn off lines by clicking their label. Focus them by double clicking.
    </li>
    <li>Pinch or drag to zoom.</li>
  </ul>
  <h3>Other Data Dashboards</h3>
  <ul>
    <li>
      <a
        rel="noopener"
        target="_blank"
        href="https://coronavirus.jhu.edu/map.html"
        >Johns Hopkins GIS Dashboard</a
      >
    </li>
    <li>
      <a
        rel="noopener"
        target="_blank"
        href="https://github.com/CSSEGISandData/COVID-19"
        >Johns Hopkins Github Data</a
      >
    </li>
    <li>
      <a
        rel="noopener"
        target="_blank"
        href="https://www.wunderground.com/wundermap?covid=1&lat=41.225&lon=-73.008&cm_ven=covid-map"
        >WeatherUnderground's Map</a
      >
    </li>
    <li>
      <a
        rel="noopener"
        target="_blank"
        href="https://github.com/nytimes/covid-19-data"
        >NYT Github Data</a
      >
    </li>
  </ul>
</about>
