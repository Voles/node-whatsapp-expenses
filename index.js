'use strict';

const debug = require('debug')('whatsapp-expenses');
const whatsappParser = require('node-whatsapp-parser');

module.exports.expenses = expenses;
module.exports._numbersFromString = numbersFromString;


function expenses(filepath) {
  let authors = {};

  return whatsappParser
    .parseFile(filepath)
    .then(function (messages) {
      messages.forEach((message) => {
        let author = message.author;
        let month = message.date.getMonth();

        authors[author] = authors[author] || {};
        authors[author][month] = authors[author][month] || 0;
        authors[author][month] += sum(numbersFromString(message.content));
      });

      return authors;
    })
    .then((authors) => {
      Object.keys(authors)
        .forEach((author) => {
          Object.keys(authors[author])
            .forEach((month) => {
              authors[author][month] = round(authors[author][month], 2);
            });
      });

      return authors;
    })
  .catch(debug);
}

function numbersFromString(input) {
  input = input.replace(/\./g, '');
  input = input.replace(/,/g, '.');

  var res = input.match(/[+-]?\d+(\.\d+)?/g);
  res = res || [];

  return res.map(parseFloat);
}

function sum(values, startValue) {
  values = values || [];
  startValue = startValue || 0;

  var nextValues = values.splice(0, 1);

  if (nextValues.length < 1) {
    return startValue;
  }

  return sum(values, startValue + nextValues[0]);
}

// via http://www.jacklmoore.com/notes/rounding-in-javascript/
function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
