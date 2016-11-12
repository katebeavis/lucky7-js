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

    it("has a choice object", function() {
      expect(game.choice).toEqual (new Choice());
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

  describe('makeChoice', function() {
    beforeEach(function() {
      game.addPlayer(2);
    });

    describe('player chooses =7', function() {

      it("player receives a choice of 7", function() {
        var player = game.players[0];
        game.makeChoice(player, "=7");
        expect(player.choice).toEqual (7);
      });

    });

    describe('player chooses <7', function() {

      it("player receives a choice of 1", function() {
        var player = game.players[0];
        game.makeChoice(player, "<7");
        expect(player.choice).toEqual (1);
      });

    });

    describe('player chooses >7', function() {

      it("player receives a choice of 12", function() {
        var player = game.players[0];
        game.makeChoice(player, ">7");
        expect(player.choice).toEqual (12);
      });

    });

    describe('player chooses a non valid input', function() {

      it("an error is thrown", function() {
        var player = game.players[0];
        expect(function() { game.makeChoice(player, "5"); } ).toThrow("Invalid choice");
      });

    });
    
  });

  describe('allBetsMade', function() {
    beforeEach(function() {
      game.addPlayer(2);
    });

    it("returns true if all players have placed a bet", function() {
      var player0 = game.players[0];
      var player1 = game.players[1];
      game.placeBet(player0, 10);
      game.placeBet(player1, 20);
      expect(game.allBetsMade()).toBeTruthy();
    });

    it("returns false if all players have NOT placed a bet", function() {
      var player0 = game.players[0];
      game.placeBet(player0, 10);
      expect(game.allBetsMade()).toBeFalsy();
    });

  });

  describe('allChoicesMade', function() {
    beforeEach(function() {
      game.addPlayer(2);
    });

    it("returns true if all players have placed a bet", function() {
      var player0 = game.players[0];
      var player1 = game.players[1];
      game.makeChoice(player0, "=7");
      game.makeChoice(player1, "<7");
      expect(game.allChoicesMade()).toBeTruthy();
    });

    it("returns false if all players have NOT placed a bet", function() {
      var player0 = game.players[0];
      game.makeChoice(player0, "=7");
      expect(game.allChoicesMade()).toBeFalsy();
    });

  });

  describe('rollDice', function() {

    it("returns a value", function() {
      expect(game.rollDice()).toBeGreaterThan(1);
      expect(game.rollDice()).toBeLessThan(13);
    });

  });

  describe('determineWinners', function() {

    describe('when all players are winners', function() {
      beforeEach(function() {
        game.addPlayer(2);
      });

      it("returns all players", function() {
        var player0 = game.players[0];
        var player1 = game.players[1];
        player0.choice = 7;
        player1.choice = 7;
        player0.bet = 40;
        player1.bet = 40;
        game.dice.value = 7
        expect(game.determineWinners()).toEqual ([player0, player1]);
      });

    });

    describe('when no players are winners', function() {
      beforeEach(function() {
        game.addPlayer(2);
      });

      it("returns no players", function() {
        var player0 = game.players[0];
        var player1 = game.players[1];
        player0.choice = 7;
        player1.choice = 7;
        player0.bet = 40;
        player1.bet = 40;
        game.dice.value = 1
        expect(game.determineWinners()).toEqual ([]);
      });

    });

    describe('when at least one player is a winner', function() {
      beforeEach(function() {
        game.addPlayer(2);
      });

      it("returns no players", function() {
        var player0 = game.players[0];
        var player1 = game.players[1];
        player0.choice = 7;
        player1.choice = 1;
        player0.bet = 40;
        player1.bet = 40;
        game.dice.value = 7
        expect(game.determineWinners()).toEqual ([player0]);
      });

    });

  });

  describe('updatePlayerMoney', function() {

    beforeEach(function() {
      game.addPlayer(1);
    });

    it("updates the players money", function() {
      var player = game.players[0];
      game.updatePlayerMoney(player, 40)
      expect(player.money).toEqual (140);
    });

  });

  describe('checkIfPlayerIsOut', function() {

    beforeEach(function() {
      game.addPlayer(1);
    });

    it("returns a player with a status of out when they have no money", function() {
      var player = game.players[0];
      player.money = 0
      expect(game.checkIfPlayerIsOut(player)).toBeTruthy();
    });

    it("does NOT return a player with a status of out when they have no money", function() {
      var player = game.players[0];
      expect(game.checkIfPlayerIsOut(player)).toBeFalsy();
    });

  });

  describe('determineFinalWinner', function() {

    beforeEach(function() {
      game.addPlayer(2);
    });

    it("returns a player with a status of out when they have no money", function() {
      var player0 = game.players[0];
      var player1 = game.players[1];
      player0.money = 7;
      player1.money = 1;
      expect(game.determineFinalWinner()).toEqual (0);
    });

  });

});
