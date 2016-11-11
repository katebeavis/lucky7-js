var Game = function() {
  this.players = [];
  this._gameSetup();
};

Game.prototype._gameSetup = function() {
  this._createPlayers();
  this._createDice();
  this._createChoice();
  this._createDealer();
};

Game.prototype._createPlayers = function(numberOfPlayers) {
  for (var i = 0; i < numberOfPlayers; i ++) {
    this.players.push(new Player(this))
  }
};

Game.prototype._createDice = function() {
  this.dice = new Dice();
};

Game.prototype._createChoice = function() {
  this.choice = new Choice();
};

Game.prototype._createDealer = function() {
  this.dealer = new Dealer();
};

Game.prototype.addPlayer = function(num) {
  if (num > 0) {
    if (!this.gameFull()) {
      this._createPlayers(1);
      this.addPlayer(num - 1);
    } else {
      throw "Max players exceeded"
    }
  }
};

Game.prototype.gameFull = function() {
  if (this.players.length >= 10) {
    return true
  }
};

Game.prototype.turn = function() {
  var placeBet = this.placeBet;
  var makeChoice = this.makeChoice;
  this.players.forEach(function(player) {
    placeBet(player);
    makeChoice(player);
    rollDice();
  })
  // rollDice();
};

Game.prototype.placeBet = function(player, bet) {
  if (player.hasEnoughMoney(bet)) {
    player.makeBet(bet)
    return true
  } else {
    throw "Not enough money"
  }
};

Game.prototype.makeChoice = function(player, position) {
  if (this.choice.isValid(position)) {
    position = this.choice.convertToInt(position)
    player.choice = position
    return true
  } else {
    throw "Invalid choice"
  }
};

Game.prototype.allBetsMade = function() {
  var array = []
  this.players.forEach(function(player) {
    array.push(player.bet)
  });
  return !array.includes(0);
};

Game.prototype.allChoicesMade = function() {
  var array = []
  this.players.forEach(function(player) {
    array.push(player.choice)
  });
  return !array.includes(0);
};

Game.prototype.resetChoices = function() {
  this.players.forEach(function(player) {
    player.resetChoice();
  });
};

Game.prototype.rollDice = function() {
  this.dice.roll();
  return this.dice.getCurrentValue();
};

Game.prototype.updatePlayerMoney = function(player, winnings) {
  player.updateMoney(winnings);
};

Game.prototype.determineWinners = function() {
  winners = []
  var roll = this.dice.value;
  var dealer = this.dealer;
  var game = this;
  this.players.forEach(function(player) {
    var originalValue = player.money
    winnings = dealer.calculateWinnings(roll, player.bet, player.choice)
    game.updatePlayerMoney(player, winnings);
    if (player.money > originalValue) {
      winners.push(player);
    }
  });
  return winners
};

// player makes a bet
// player makes a choice
// roll dice
// calculate winnings
// update total

// for (var i = 0; i < num; i ++) {
  // }
