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

  describe('roll', function() {

    it("returns a value between 1 and 12", function() {
      dice.roll();
      expect(dice.value >= 1 && dice.value <= 12).toBeTruthy();
    });

  });

});
