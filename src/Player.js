var Player = function() {
  this.money = 100;
  this.choice = 0
  this.bet = 0;
};

Player.prototype.hasEnoughMoney = function(bet) {
  if (bet <= this.money) {
    return true
  }
};

Player.prototype.updateMoney = function(winnings) {
  this.money = addNumbers(this.money, winnings)
  this.resetBet();
};

Player.prototype.makeBet = function(bet) {
  this.bet = bet
};

Player.prototype.resetBet = function() {
  this.bet = 0;
};

Player.prototype.resetChoice = function() {
  this.choice = 0;
};

function addNumbers(a, b) {
  return a + b;
};
