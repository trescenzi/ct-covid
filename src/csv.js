import takeWhile from "lodash-es/takeWhile.js";
import groupBy from "lodash-es/groupBy.js";
const DATA_STATEWIDE = `https://data.ct.gov/resource/rf3k-f8fg.json?$$app_token=${process.env.CT_GOV_APP_TOKEN}`;
const DATA_BY_COUNTY = `https://data.ct.gov/resource/bfnu-rgqt.json?$$app_token=${process.env.CT_GOV_APP_TOKEN}`;
const DATA_BY_TOWN = `https://data.ct.gov/resource/28fr-iqnx.json?$$app_token=${process.env.CT_GOV_APP_TOKEN}&$limit=50000`;
const DATE_UPDATED = `https://data.ct.gov/resource/rf3k-f8fg.json?$$app_token=${process.env.CT_GOV_APP_TOKEN}&$select=date`;

const json = (r) => r.json();
export function getDateUpdated() {
  return fetch(DATE_UPDATED)
    .then((x) => x.json())
    .then((dates) => new Date(dates[dates.length - 1].date));
}
export function fetchDataSet(kind) {
  let governmentData;
  let transcribedData;
  switch (kind) {
    case "STATE":
      if (cachedCSVs.STATE) {
        return Promise.resolve(cachedCSVs.STATE);
      }
      // the state data doesn't go back to the first cases so we have to merge
      // it with the hand transcribed data
      governmentData = fetch(DATA_STATEWIDE).then(json);
      transcribedData = Promise.all([
        fetchCSV("cases"),
        fetchCSV("deaths"),
        fetchCSV("hospitalizations"),
      ]).then(
        ([{ data: cases }, { data: deaths }, { data: hospitalizations }]) =>
          cases.map((day, i) => ({
            date: day.Date,
            cases: day.Overall,
            deaths: deaths[i].Overall,
            hospitalizations: hospitalizations[i].Overall,
            state: "CONNECTICUT",
          }))
      );
      return Promise.all([governmentData, transcribedData]).then(mergeData);
    case "COUNTY":
      governmentData = fetch(DATA_BY_COUNTY)
        .then(json)
        .then((data) => processDataByLocation(data, "county"));
      transcribedData = Promise.all([
        fetchCSV("cases"),
        fetchCSV("deaths"),
        fetchCSV("hospitalizations"),
      ]).then(
        ([{ data: cases }, { data: deaths }, { data: hospitalizations }]) => ({
          cases: cases.map((data) => ({
            date: data.Date,
            ...data,
          })),
          deaths: deaths.map((data) => ({
            date: data.Date,
            ...data,
          })),
          hospitalizations: hospitalizations.map((data) => ({
            date: data.Date,
            ...data,
          })),
        })
      );
      return Promise.all([governmentData, transcribedData]).then(
        ([
          {
            cases: govCases,
            deaths: govDeaths,
            hospitalizations: govHospitalizations,
          },
          {
            cases: transcribedCases,
            deaths: transcribedDeaths,
            hospitalizations: transcribedHospitalizations,
          },
        ]) => ({
          cases: mergeData([govCases, transcribedCases]),
          deaths: mergeData([govDeaths, transcribedDeaths]),
          hospitalizations: mergeData([
            govHospitalizations,
            transcribedHospitalizations,
          ]),
        })
      );
    case "TOWN":
      return fetch(DATA_BY_TOWN)
        .then(json)
        .then((data) => processDataByLocation(data, "town"));
  }
}

function processDataByLocation(data, labelKey) {
  return Object.values(
    groupBy(data, ({ lastupdatedate }) => lastupdatedate)
  ).reduce(
    (aggregateData, day) => {
      const dayData = day.reduce(
        (breakdown, value) => ({
          cases: {
            ...breakdown.cases,
            date: value.lastupdatedate,
            [value[labelKey]]: value.confirmedcases,
          },
          deaths: {
            ...breakdown.deaths,
            date: value.lastupdatedate,
            [value[labelKey]]: value.deaths,
          },
          hospitalizations: {
            ...breakdown.hospitalizations,
            date: value.lastupdatedate,
            [value[labelKey]]: value.hospitalizedcases,
          },
        }),
        {}
      );
      return {
        cases: [...aggregateData.cases, dayData.cases],
        deaths: [...aggregateData.deaths, dayData.deaths],
        hospitalizations: [
          ...aggregateData.hospitalizations,
          dayData.hospitalizations,
        ],
      };
    },
    { cases: [], deaths: [], hospitalizations: [] }
  );
}

function mergeData([governmentData, transcribedData]) {
  const firstGovernmentDate = new Date(governmentData[0].date);
  return [
    ...takeWhile(
      transcribedData,
      (day) => new Date(`${day.date}T00:00:00.000`) < firstGovernmentDate
    ),
    ...governmentData,
  ];
}
const cachedCSVs = {
  cases: null,
  deaths: null,
  hospitalizations: null,
  STATE: null,
  COUNTY: null,
  TOWN: null,
};
export function fetchCSV(name) {
  if (cachedCSVs[name]) {
    return Promise.resolve(cachedCSVs[name]);
  }

  cachedCSVs[name] = fetch(`/data/${name}.csv`)
    .then((response) => response.text())
    .then(processCSV)
    .then((data) => {
      cachedCSVs[name] = data;
      return data;
    });
  return cachedCSVs[name];
}

function processCSV(csv) {
  const [rawHeaders, ...body] = csv.split("\n").map((s) => s.trim());
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
