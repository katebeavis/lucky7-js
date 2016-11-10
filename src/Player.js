var Player = function() {
  this.money = 100;
  this.choice = new Choice();
};

Player.prototype.hasEnoughMoney = function(bet) {
  if (bet <= this.money) {
    return true
  }
};

Player.prototype.calculateCurrentTotal = function(winnings) {
  return addNumbers(this.money, winnings)
};
