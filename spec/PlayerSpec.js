'use strict';

describe("Player", function() {
  var player;

  beforeEach(function() {
    player = new Player();
  });

  describe('start of game', function() {

    it("has £100", function() {
      expect(player.money).toEqual (100);
    });

    it("has a choice", function() {
      expect(player.choice).toEqual (0);
    });

    it("has a bet of 0", function() {
      expect(player.bet).toEqual (0);
    });

  });

  describe('makeBet', function() {

    it("has £100", function() {
      player.makeBet(10);
      expect(player.bet).toEqual (10);
    });

  });

  describe('hasEnoughMoney', function() {

    it("returns true if bet that is less than money available", function() {
      expect(player.hasEnoughMoney(20)).toBeTruthy();
    });

    it("returns true if bet that is equal to money available", function() {
      expect(player.hasEnoughMoney(100)).toBeTruthy();
    });

    it("returns false if bet is greater than money available", function() {
      expect(player.hasEnoughMoney(110)).toBeFalsy();
    });

  });

  describe('updateMoney', function() {

    describe('positive winnings', function() {

      it("sums up the money and the winnings", function() {
        player.updateMoney(20);
        expect(player.money).toEqual (120);
      });

    });

  describe('negative winnings', function() {

    it("sums up the money and the winnings", function() {
      player.updateMoney(-20);
      expect(player.money).toEqual (80);
    });

  });

  });

});
