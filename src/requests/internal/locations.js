import { readRemoteFile } from 'react-papaparse';

export async function load() {
  readRemoteFile('/gaz_names.csv', {
    complete: _getData
  })
}

function _getData(result) {
  let data = result.data;
  let validData = [];

  data.forEach(d => {
    if (d[18] === "Yes") {
      let validItem = {
        name: d[1],
        longitude: Number(d[12]),
        latitude: Number(d[11]),
      }
      validData.push(validItem);
    }
  })

  return validData;
}