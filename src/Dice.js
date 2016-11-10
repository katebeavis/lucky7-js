var Dice = function() {
  this.value = 0;
};

Dice.prototype.getCurrentValue = function() {
  return this.value;
};

Dice.prototype.roll = function() {
  this.value = Math.floor((Math.random() * 11) + 2);
};
