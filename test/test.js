var assert = require('assert');


//RUN CONTRACT FUNCTIONS
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3, 4, 5, 6].indexOf(8), -1);
    });
  });
});