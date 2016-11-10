'use strict';

describe("Dealer", function() {
  var dealer;

  beforeEach(function() {
    dealer = new Dealer();
  });

  describe('start of game', function() {

    it("has a value of 0 to begin with", function() {
      expect(dealer.getCurrentValue()).toEqual (0);
    });

  });

  describe('receiveBet', function() {

    it("changes the value of the bet to the amount passed in", function() {
      dealer.receiveBet(10)
      expect(dealer.getCurrentValue()).toEqual (10);
    });

  });

  describe('calculateWinnings', function() {
    beforeEach(function() {
      dealer.receiveBet(10);
    });

    describe('when the player has chosen 7', function() {

      it("returns the bet multiplied by 6 if the dice roll is 7", function() {
        expect(dealer.calculateWinnings(7, 7)).toEqual (60);
      });

      it("returns 0 if the dice is less than 7", function() {
        expect(dealer.calculateWinnings(4, 7)).toEqual (0);
      });

      it("returns 0 if the dice is more than 7", function() {
        expect(dealer.calculateWinnings(8, 7)).toEqual (0);
      });

    });

    describe('when the player has chosen <7', function() {

      it("returns double the bet if the dice roll is less than 7", function() {
        expect(dealer.calculateWinnings(4, 1)).toEqual (20);
      });

      it("returns 0 if the dice is more than 7", function() {
        expect(dealer.calculateWinnings(8, 1)).toEqual (0);
      });

      it("returns 0 if the dice is equal to 7", function() {
        expect(dealer.calculateWinnings(7, 1)).toEqual (0);
      });

    });

    describe('when the player has chosen >7', function() {

      it("returns double the bet if the dice roll is more than 7", function() {
        expect(dealer.calculateWinnings(8, 12)).toEqual (20);
      });

      it("returns 0 if the dice is less than 7", function() {
        expect(dealer.calculateWinnings(4, 12)).toEqual (0);
      });

      it("returns 0 if the dice is equal to 7", function() {
        expect(dealer.calculateWinnings(7, 12)).toEqual (0);
      });

    });

  });

});
