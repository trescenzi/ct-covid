<style>
.footer {
  display: flex;
  font-size: 12px;
  background-color: #eee;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.footer div + div {
  margin-left: 12px;
}

@media (max-width: 450px) {
  .footer {
    display: grid;
    grid-template-columns: max-content max-content;
    grid-auto-rows: min-content;
    grid-gap: 12px;
    align-content: center;
  }
}
</style>

<div class="footer">
  <div>
    Data from <a rel="noopener" target="_blank" href="https://portal.ct.gov/Coronavirus">The State of Connecticut</a>
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
