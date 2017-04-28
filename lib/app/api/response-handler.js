"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (response) {
  console.log(response);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};