'use strict';

const assert = require('assert');
const expenseTracker = require('./index');

describe('the Whatsapp expenses module', () => {
  describe('numbers from string', () => {
    it('should return en empty list for an empty string', () => {
      var output = expenseTracker._numbersFromString('');
      assert.deepEqual(output, []);
    });

    it('should work for a comma as decimal separator', () => {
      var output = expenseTracker._numbersFromString('10,50');
      assert.deepEqual(output, [10.50]);
    });

    it('should work for a single number surrounded by test', () => {
      var output = expenseTracker._numbersFromString('foo 10,50 bar');
      assert.deepEqual(output, [10.50]);
    });

    it('should work for an integer', () => {
      var output = expenseTracker._numbersFromString('42');
      assert.deepEqual(output, [42]);
    });

    it('should work with a dot as group separator', () => {
      var output = expenseTracker._numbersFromString('40.000');
      assert.deepEqual(output, [40000]);
    });

    it('should work for two numbers', () => {
      var output = expenseTracker._numbersFromString('40 2');
      assert.deepEqual(output, [40, 2]);
    });

    it('should work for three numbers', () => {
      var output = expenseTracker._numbersFromString('1 plus 2 is 3');
      assert.deepEqual(output, [1, 2, 3]);
    });

    it('should work for two floating point numbers', () => {
      var output = expenseTracker._numbersFromString('15,49 29,67');
      assert.deepEqual(output, [15.49, 29.67]);
    });
  });

  it('should group the expenses per month', (done) => {
    expenseTracker
      .expenses('example-input.txt')
      .then((expenses) => {
        assert.deepEqual(expenses, {
          'Niels Dequeker': {
            0: 42,
            1: 20,
            5: 42
          },
          'Jane Doe': {
            0: 20
          }
        });

        done();
      })
      .catch(done);
  });
});
