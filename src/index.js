import { render, Fragment } from "preact";
import { useState } from "preact/hooks";
import { html } from "htm/preact";
import { Charts } from "./charts.js";

const portalUrl = "https://portal.ct.gov/Coronavirus";

const Instructions = ({ onclose }) => html`
  <div class="instructions">
    <div class="instructions-content">
      <h4>How to Use</h4>
      <ul>
        <li>Hover, or tap on, lines to view specific data points.</li>
        <li>
          Turn off lines by clicking their label. Focus them by double clicking.
        </li>
        <li>Pinch or drag to zoom.</li>
      </ul>
      <h4>Other Data Dashboards</h4>
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
            >Johns Hopkins CSVs</a
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
      </ul>
      <button onclick=${onclose} type="button">
        Close
      </button>
    </div>
  </div>
`;

function App() {
  const [showInstructions, setShowInstructions] = useState(false);
  return html`
  <${Fragment}>
    <div class='header'>
      <h1>
        Connecticut Covid-19 Case Statistics
      </h1>
      <h2>
        Data Updated April 13th 2020
      </h2>
      <h3>
        For official information visit <a rel="noopener" target="_blank" href=${portalUrl}>ct.gov/Coronavirus</a>
      </h3>
      <div>
        <div class="instruction-link" onclick=${() =>
          setShowInstructions(true)}>
          More Information
        </div>
      </div>
    </div>
    <${Charts} />
    <div class='footer'>
      <div>
        Data from <a rel="noopener" target="_blank" href=${portalUrl}>The State of Connecticut</a>
      </div>
      <div>
        <a rel="noopener" target="_blank" href="https://github.com/trescenzi/ct-covid">Open Source on Github</a>
      </div>
      <div>
        <a rel="noopener" target="_blank" href="https://plotly.com">Powered by Plotly.js</a>
      </div>
      <div>
        <a rel="noopener" target="_blank" href="https://zeit.co">Hosted by Zeit</a>
      </div>
    </div>
    ${
      showInstructions &&
      html`<${Instructions} onclose=${() => setShowInstructions(false)} />`
    }
  </${Fragment}>
  `;
}

render(html`<${App} />`, document.querySelector("#app"));
