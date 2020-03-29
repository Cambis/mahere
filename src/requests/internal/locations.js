import { readRemoteFile } from 'react-papaparse';
// import Papa from 'papaparse';

export async function load(foo) {
  readRemoteFile('gaz_names.csv', {
    step: function(results) {
      foo(results);
    },
    complete: function() {
      console.log("DONE");
    }
  });

  // var csvFilePath = await fetchCsv();
  // var Papa = require("papaparse/papaparse.min.js");

  // Papa.parse(csvFilePath, {
  //   step: function(row) {
  //     // console.log("Row:", row.data);
  //   },
  //   complete: function(results) {
  //     console.log(results);
  //   }
  // })
}

// async function fetchCsv() {
//   return fetch('gaz_names.csv').then(function (response) {
//     let reader = response.body.getReader();
//     let decoder = new TextDecoder('utf-8');

//     return reader.read().then(function (result) {
//       return decoder.decode(result.value);
//     });
//   });
// }