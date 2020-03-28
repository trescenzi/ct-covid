import { render, Fragment } from 'preact';
import { html } from 'htm/preact';
import { CSVPlot } from './csv-plot.js';

const OVERALL = ['Overall'];
const BY_COUNTY = ['Fairfield', 'Hartford', 'New Haven', 'New London', 'Middlesex', 'Tolland', 'Windham'];
function App() {
  return html`
  <${Fragment}>
    <${CSVPlot} 
      csvName='cases'
      xColumn='Date'
      yColumns=${OVERALL}
      layoutOptions=${{
        title: 'Total Cases',
        showLegend: true,
      }}
      />
    <${CSVPlot}
      csvName='cases'
      xColumn='Date'
      yColumns=${BY_COUNTY}
      layoutOptions=${{
        title: 'Cases by county',
        showLegend: true,
      }}
      />
    <${CSVPlot}
      csvName='deaths'
      xColumn='Date'
      yColumns=${OVERALL}
      layoutOptions=${{
        title: 'Total Deaths',
        showLegend: true,
      }}
      />
    <${CSVPlot}
      csvName='deaths'
      xColumn='Date'
      yColumns=${BY_COUNTY}
      layoutOptions=${{
        title: 'Deaths By County',
        showLegend: true,
      }}
      />
    <${CSVPlot}
      csvName='hospitalizations'
      xColumn='Date'
      yColumns=${OVERALL}
      layoutOptions=${{
        title: 'Total Hospitalizations',
        showLegend: true,
      }}
      />
    <${CSVPlot}
      csvName='hospitalizations'
      xColumn='Date'
      yColumns=${BY_COUNTY}
      layoutOptions=${{
        title: 'Hospitalizations By County',
        showLegend: true,
      }}
      />
  </${Fragment}>
  `
}

render(html`<${App} />`, document.querySelector('#app'));
