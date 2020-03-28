import { render, Fragment } from "preact";
import { html } from "htm/preact";
import { Charts } from "./charts.js";

function App() {
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
        For official information visit <a href="https://portal.ct.gov/Coronavirus">ct.gov/Coronavirus</a>
      </h3>
    </div>
    <${Charts} />
    <div class='footer'>
      <div>
        Created by Thomas Crescenzi
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
  </${Fragment}>
  `;
}

render(html`<${App} />`, document.querySelector("#app"));
