'use strict';

describe("Dice", function() {
  var dice;

  beforeEach(function() {
    dice = new Dice();
  });

  describe('start of game', function() {

    it("has a value of 0 to begin with", function() {
      expect(dice.getCurrentValue()).toEqual (0);
    });

  });

});
