var Game = function() {
  this.players = [];
  this._gameSetup();
};

Game.prototype._gameSetup = function() {
  this._createPlayers();
  this._createDice();
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
  this.players.forEach(function(player) {
  placeBet(player);
  })
};

Game.prototype.placeBet = function(player, bet) {
  if (player.hasEnoughMoney(bet)) {
    this.dealer.receiveBet(bet)
  } else {
    throw "Not enough money"
  }
};

// player makes a bet
// player makes a choice
// roll dice
// calculate winnings
// update total

// for (var i = 0; i < num; i ++) {
  // }
