var Dealer = function() {
  this.bet = 0;
};

Dealer.prototype.getCurrentValue = function() {
  return this.bet;
};

Dealer.prototype.receiveBet = function(bet) {
  this.bet = addNumbers(this.bet, bet)
};

Dealer.prototype.calculateWinnings = function(roll, bet, choice) {
  if (roll === 7 && choice === 7) {
    return ((bet * 6) - bet)
  } else if (roll > 7 && choice > 7 || roll < 7 && choice < 7) {
    return ((bet * 2) - bet)
  } else {
    return bet - (bet * 2)
  }
};
