import { render, Fragment } from "preact";
import { html } from "htm/preact";
import { Charts } from "./charts.js";

function App() {
  return html`
  <${Fragment}>
    <${Charts} />
  </${Fragment}>
  `;
}

render(html`<${App} />`, document.querySelector("#app"));
