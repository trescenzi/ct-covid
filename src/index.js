import { render, Fragment, h } from "preact";

const portalUrl = "https://portal.ct.gov/Coronavirus";

export function App() {
  return (
    <>
      <div class="header">
        <h1>Connecticut Covid-19 Case Statistics</h1>
        <h2>
          For official information visit{" "}
          <a rel="noopener" target="_blank" href={portalUrl}>
            ct.gov/Coronavirus
          </a>
        </h2>
      </div>
      <div class="body">
        <h4> Thanks for visiting!</h4>
        <div>
          <p>
            Around the middle of June CT updated their reporting to break out
            presumptive positives, and deaths from the data. This broke the
            charts here as they weren't expecting the underlying data to change.
            I don't have the time to update this. In addition there are
            significantly better charts out there at this point. I highly
            recommend John's Hopkins dashboards. You can find them linked below:
          </p>
          <ul>
            <li>
              <a href="https://coronavirus.jhu.edu/data/state-timeline/new-confirmed-cases/connecticut">
                CT Cases
              </a>
            </li>
            <li>
              <a href="https://coronavirus.jhu.edu/testing/individual-states/connecticut">
                CT Test Positivity Rate
              </a>
            </li>
            <li>
              <a href="https://coronavirus.jhu.edu/us-map">US Map</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer">
        <div>
          Data from{" "}
          <a rel="noopener" target="_blank" href={portalUrl}>
            The State of Connecticut
          </a>
        </div>
        <div>
          <a
            rel="noopener"
            target="_blank"
            href="https://github.com/trescenzi/ct-covid"
          >
            Open Source on Github
          </a>
        </div>
        <div>
          <a rel="noopener" target="_blank" href="https://plotly.com">
            Powered by Plotly.js
          </a>
        </div>
        <div>
          <a rel="noopener" target="_blank" href="https://zeit.co">
            Hosted by Zeit
          </a>
        </div>
      </div>
    </>
  );
}

render(<App />, document.querySelector("#app"));
