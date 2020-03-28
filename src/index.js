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
        Data Updated March 27th 2020
      </h2>
      <h3>
        For official information visit <a href=${portalUrl}>ct.gov/Coronavirus</a>
      </h3>
      <div class="instruction-link" onclick=${() => setShowInstructions(true)}>
        Instructions
      </div>
    </div>
    <${Charts} />
    <div class='footer'>
      <div>
        Data from <a href=${portalUrl}>The State of Connecticut</a>
      </div>
      <div>
        <a href="https://github.com/trescenzi/ct-covid">Open Source on Github</a>
      </div>
      <div>
        <a href="https://plotly.com">Powered by Plotly.js</a>
      </div>
      <div>
        <a href="https://zeit.co">Hosted by Zeit</a>
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
