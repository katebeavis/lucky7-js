var Dealer = function() {
  this.bet = 0;
};

Dealer.prototype.getCurrentValue = function() {
  return this.bet;
};

Dealer.prototype.receiveBet = function(bet) {
  this.bet = addNumbers(this.bet, bet)
};

Dealer.prototype.calculateWinnings = function(roll, choice) {
  if (roll === 7 && choice === 7) {
    return (this.bet * 6)
  } else if (roll > 7 && choice > 7 || roll < 7 && choice < 7) {
    return (this.bet * 2)
  } else {
    return this.bet - this.bet
  }
};
