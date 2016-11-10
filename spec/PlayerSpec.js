'use strict';

describe("Player", function() {
  var player;

  beforeEach(function() {
    player = new Player();
  });

  describe('start of game', function() {

    it("starts with £100", function() {
      expect(player.money).toEqual (100);
    });

    it("has a choice", function() {
      expect(player.choice).toEqual (new Choice());
    });


  });

  describe('hasEnoughMoney', function() {

    it("is able to place a bet that is greater than money available", function() {
      expect(player.hasEnoughMoney(20)).toBeTruthy();
    });

    it("is NOT able to place a bet that is greater than money available", function() {
      expect(player.hasEnoughMoney(110)).toBeFalsy();
    });

  });

  describe('calculateCurrentTotal', function() {

    it("sums up the money and the winnings", function() {
      expect(player.calculateCurrentTotal(20)).toEqual (120);
    });

  });

});
