"use strict";

var findup = require("findup");
var fs = require("fs");
var path = require("path");
var log = require("winston");
var CHANGELOGRC = ".changelogrc";

module.exports = function () {
  var promise = new Promise(function (resolve, reject) {
    findup(process.cwd(), CHANGELOGRC, function (err, filePath) {
      if (err) {
        log.warn("Unable to find a configuration file. Please refer to documentation to learn how to ser up: https://github.com/design4pro/release-me#readme");
        log.warn("Read a default configuration file");

        fs.readFile(path.join("../", CHANGELOGRC), function (readError, content) {
          resolve(JSON.parse(content.toString()));
        });
        
        resolve({});

        return;
      }

      fs.readFile(path.join(filePath, CHANGELOGRC), function (readError, content) {
        if (readError) {
          log.warn("Unable to read a configuration file. Please refer to documentation to learn how to ser up: https://github.com/design4pro/release-me#readme");
          resolve({});

          return;
        }

        resolve(JSON.parse(content.toString()));
      });
    });
  });

  return promise;
};
