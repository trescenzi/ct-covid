import deaths from './deaths.csv';
import cases from './cases.csv';
import hospitalizations from './hospitalizations.csv';
import townGeoJson from '../../../static/ct-towns.json';
import {processCSV} from './_process_csv';

export async function get(req, res, next) {
  const {name} = req.params;

  res.setHeader('Content-Type', 'application/json');
  switch (name) {
    case 'geo':
        res.end(JSON.stringify(townGeoJson));
        break;
    case 'cases':
        res.end(JSON.stringify(processCSV(cases, 'Date')));
        break;
    case 'deaths': 
      res.end(JSON.stringify(processCSV(deaths,'Date')));
      break;
    case 'hospitalizations':
      res.end(JSON.stringify(processCSV(hospitalizations, 'Date')));
      break;
    default:
      next();
  }
}
