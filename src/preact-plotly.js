import { html } from "htm/preact";
import { useEffect, useRef } from "preact/hooks";

export const Plot = ({ data, layout = {}, options = {} }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !window.Plotly) return;
    Plotly.newPlot(
      ref.current,
      data,
      {
        ...layout,
        font: {
          family: "Fira Mono, monospace",
          size: 12,
        },
      },
      options
    );
  });

  return html`<div ref=${ref} />`;
};
