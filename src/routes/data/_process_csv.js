const tryToTypeVal = val => {
  try {
    return JSON.parse(val);
  } catch (e) {}
  
  const date = new Date(val);
  if (date.getTime() === date.getTime()) {
    return date;
  }

  return val;
}
const convertToLogScale = (data) => {
  const max = data.reduce((max, {y}) => y > max ? y : max, -Infinity);
  return data.map(({x, y}) => ({x, y: y === 0 ? 0 : (max * Math.log10(y)) / Math.ceil(Math.log10(max))}));
}
export function processCSV(csvJSON, xField) {
  return csvJSON.reduce((csv, row, i) => ({
    xLabels: [...csv.xLabels, row[xField]],
    data: Object.keys(row)
    .filter(key => key !== xField)
    .map((key, j) => ({
      name: key,
      data: [...(csv.data[j] ? csv.data[j].data : []), {x: i, y: tryToTypeVal(row[key])}],
    }))
    .map(({name, data}) => ({name, data, logData: convertToLogScale(data)}))
  }), {xLabels: [], data: []})
}
