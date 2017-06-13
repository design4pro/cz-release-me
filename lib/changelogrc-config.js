'use strict';

const findup = require('findup');
const fs = require('fs');
const path = require('path');

let log = require('winston');
let CHANGELOGRC = '.changelogrc';

module.exports = () => {
  let promise = new Promise((resolve, reject) => {
    findup(process.cwd(), CHANGELOGRC, (err, filePath) => {
      if (err) {
        log.warn('Unable to find a configuration file. Please refer to documentation to learn how to ser up: https://github.com/design4pro/release-me#readme"');
        resolve({});

        return;
      }

      fs.readFile(path.join(filePath, CHANGELOGRC), (readError, content) => {
        if (readError) {
          log.warn('Unable to read a configuration file. Please refer to documentation to learn how to ser up: https://github.com/design4pro/release-me#readme"');
          resolve({});

          return;
        }

        resolve(JSON.parse(content.toString()));
      });
    });
  });

  return promise;
};
