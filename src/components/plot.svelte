<script>
  import * as Pancake from '@sveltejs/pancake';
  import LogScale from 'log-scale';

  export let data;
  export let x1;
  export let y1;
  export let y2;
  export let x2;
  export let xLabels;
  export let yScale = 'linear';
  export let xScale = 'linear';

  let closest;

  $: internalX2 = x2 || data.reduce((largest, {data}) => data.reduce((l, {x}) => x > l ? x : l, largest), x1);
  $: internalY2 = y2 || data.reduce((largest, {data}) => data.reduce((l, {y}) => y > l ? y : l, largest), y1);

  const convertToLogScale = (max) => (val) => val === 0 ? 0 : Math.round((max * Math.log10(val)) / Math.log10(max));
  const convertToLinearScale = (max) => (val) => val === 0 ? 0 :
    Math.round(Math.pow(10, Math.log10(max) * val / max));

  $: yLogConverter = convertToLogScale(internalY2);
  $: xLogConverter = convertToLogScale(internalX2);
  $: yLinearConverter = convertToLinearScale(internalY2);
  $: xLinearConverter = convertToLinearScale(internalX2);

  $: internalData = yScale !== 'linear' || xScale !== 'linear' ?
    data.map(({name, data}) => ({
      name,
      data: data.map(({x, y}) => ({
        x,//: xScale === 'linear' ? x : xLogConverter(x),
        y,//: yScale === 'linear' ? y : yLogConverter(y),
        xLinear: x,
        yLinear: y,
      })),
    }))
    : data;


  $: unfocusedData = !closest ? internalData : internalData.filter(({name}) => name !== closest.name)

  $: points = internalData.reduce((points, {name, data}, positionInData) => [...points, 
    ...data.map(({x, y, xLinear, yLinear}) => ({x, xLinear, y, yLinear, name, data, positionInData }))
  ], []);
</script>

<div class="plot" >
  <Pancake.Chart x1={x1} x2={internalX2} y1={y1} y2={internalY2} xScale={xScale} yScale={yScale}>
    <Pancake.Grid vertical count={5} let:value>
      <span class="x label">{xLabels ? xLabels[value] || xLabels[xLabels.length -1] : value}</span>
    </Pancake.Grid>

    <Pancake.Grid horizontal count={5} let:value>
      {#if value !== 0}
        <span class="y label">{value}</span>
      {/if}
    </Pancake.Grid>
    {console.log(internalData)}

    {#each internalData as path, i}
      {#if !closest || path.name !== closest.name}
        <Pancake.Svg>
          <Pancake.SvgLine data={path.data} let:d>
          <path class="data" style={`stroke: var(--color-${i+1}-unfocused)`} {d}/>
          </Pancake.SvgLine>
        </Pancake.Svg>
      {/if}
    {/each}
    
		{#if closest}
			<Pancake.Point x={closest.x} y={closest.y}>
				<span class="annotation-point"></span>
				<div class="annotation" style="transform: translate(+{100 * ((closest.x - x1) / (x2 - x1))}%,0)">
          <strong>{data.length > 1 ? closest.name : xLabels[closest.xLinear - 1]}:{closest.yLinear}</strong>
				</div>
			</Pancake.Point>

      <Pancake.Svg>
        <Pancake.SvgLine data={closest.data} let:d>
        <path class="data" style={`stroke: var(--color-${closest.positionInData+1}`} {d}/>
        </Pancake.SvgLine>
      </Pancake.Svg>
		{/if}


    <Pancake.Quadtree data={points} bind:closest/>
  </Pancake.Chart>
</div>

<style>

  * {
    box-sizing: border-box;
  }

  .plot {
    height: 100%;
    --color-1: #032980;
    --color-2: #6b3f90;
    --color-3: #804392;
    --color-4: #c76ca1;
    --color-5: #ffa1b4;
    --color-6: #ffa592;
    --color-7: #ffb767;
    --color-8: #ffd43f;
    --color-1-unfocused: #03298088;
    --color-2-unfocused: #6b3f9088;
    --color-3-unfocused: #80439288;
    --color-4-unfocused: #c76ca188;
    --color-5-unfocused: #ffa1b488;
    --color-6-unfocused: #ffa59288;
    --color-7-unfocused: #ffb76788;
    --color-8-unfocused: #ffd43f88;
  }

  .chart {
    margin: 16px;
    height: 100%;
  }
  
  path.data {
    stroke-linejoin: round;
    stroke-linecap: round;
    stroke-width: 2px;
    fill: none;
  }

  .label {
    font-size: 12px;
    color: #444;
  }

  .y.label {
  }

  .x.label {
    position: absolute;
    top: 100%;
    margin-top: 16px;
  }

  .annotation {
    margin: 4px;
    font-size: 12px;
  }
  .annotation-point {
		position: absolute;
		width: 10px;
		height: 10px;
		border-radius: 50%;
    border: 1px solid grey;
		transform: translate(-50%,-50%);
	}
</style>
