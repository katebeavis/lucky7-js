var Game = function() {
  this.players = [];
  this._gameSetup();
};

Game.prototype._gameSetup = function() {
  this._createPlayers();
  this._createDice();
  this._createChoice();
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

// player makes a bet
// player makes a choice
// roll dice
// calculate winnings
// update total

// for (var i = 0; i < num; i ++) {
  // }
