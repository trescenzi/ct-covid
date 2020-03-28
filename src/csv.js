export function fetchCSV(name) {
  return fetch(`/data/${name}.csv`)
    .then((response) => response.text())
    .then(processCSV);
}

function processCSV(csv) {
  const [rawHeaders, ...body] = csv.split("\n");
  const headers = rawHeaders.split(",");

  return {
    headers,
    data: body
      .map((row) => row.split(","))
      .reduce(
        (rowObjects, row) => [
          ...rowObjects,
          {
            ...row.reduce(
              (rowObject, val, i) => ({
                ...rowObject,
                [headers[i]]: val,
              }),
              {}
            ),
          },
        ],
        []
      ),
  };
}
