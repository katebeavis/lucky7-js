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

Player.prototype.calculateCurrentTotal = function(winnings) {
  return addNumbers(this.money, winnings)
};

Player.prototype.makeBet = function(bet) {
  this.bet = bet
};

Player.prototype.resetBet = function(first_argument) {
  this.bet = 0
};
