import { html } from 'htm/preact';
import {useEffect, useRef} from 'preact/hooks'

export const Plot = ({
  data,
  layout = {},
  options = {},
}) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    Plotly.newPlot(ref.current, data, layout, options);
  });

  return html`<div ref=${ref}/>`;
}
