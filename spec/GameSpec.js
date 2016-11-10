'use strict';

describe("Game", function() {
  var game;

  beforeEach(function() {
    game = new Game();
  });

  describe('start of game', function() {

    it("has 0 players", function() {
      expect(game.players.length).toEqual (0);
    });

    it("has 1 dice", function() {
      expect(game.dice).toEqual (new Dice());
    });

    it("has 1 dealer", function() {
      expect(game.dealer).toEqual (new Dealer());
    });

  });

  describe('addPlayer', function() {

    it("can add players", function() {
      game.addPlayer(1)
      expect(game.players).toEqual ([new Player()]);
    });

    it("only accepts a max of 10 players", function() {
      expect(function() { game.addPlayer(11); } ).toThrow("Max players exceeded");
    });

  });

  describe('gameFull', function() {

    it("returns true if max number of players have been added", function() {
      game.addPlayer(10);
      expect(game.gameFull()).toBeTruthy();
    });

    it("returns false if max number of players have NOT been added", function() {
      game.addPlayer(9);
      expect(game.gameFull()).toBeFalsy();
    });

  });

  describe('placeBet', function() {
    beforeEach(function() {
      game.addPlayer(2);
    });

    it("places a bet if the player has enough money", function() {
      var player = game.players[0];
      game.placeBet(player, 10);
      expect(player.bet).toEqual (10);
    });

    it("does NOT place a bet if the player does not have enough money", function() {
      var player = game.players[0];
      expect(function() { game.placeBet(player, 200); } ).toThrow("Not enough money");
    });
    
  });

});
