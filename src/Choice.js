var Choice = function() {
};

const VALID_CHOICES = ['=7', '<7', '>7']

Choice.prototype.isValid = function(choice) {
  if (VALID_CHOICES.includes(choice)) {
    return true
  }
};

Choice.prototype.convertToInt = function(choice) {
  if (choice === '>7') {
    return 12
  } else if (choice === '<7') {
    return 1
  } else {
    return 7
  }
};
