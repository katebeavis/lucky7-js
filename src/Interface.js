var game = new Game();

$(document).ready(function() {

  $.each(game.players, function( intIndex, objValue ) {
    $("#list").append($( "<h3>" + "Player " +  (intIndex + 1) + ": " + "£" + objValue.money + "</h3>" ));
  });

  $.each(game.players, function( intIndex, objValue ) {
    $("#betList").append($( "<h3>" + "Player " +  (intIndex) + " insert your bet" + "</h3>" + "<textarea id=" + 'bet' + intIndex + "></textarea>" + "<button id=" + 'betButton' + intIndex + ">Ok</button>" ));

    $("#" + 'betButton' + intIndex + "").click(function() {
      if (game.placeBet(objValue, $("#" + 'bet' + intIndex + "").val()) === true) {$("#" + 'betButton' + intIndex + "").prop('disabled', true);} else { throw "error"}
      if (game.allBetsMade() === true) {$("#betList").addClass("hidden"); $("#choiceList").removeClass("hidden");}
    });

    $("#choiceList").append($( "<h3>" + "Player " +  (intIndex) + " insert your choice" + "</h3>" + "<textarea id=" + 'choice' + intIndex + "></textarea>" + "<button id=" + 'choiceButton' + intIndex + ">Ok</button>" ));
    $("#" + 'choiceButton' + intIndex + "").click(function() {
      if (game.makeChoice(objValue, $("#" + 'choice' + intIndex + "").val()) === true) {$("#" + 'choiceButton' + intIndex + "").prop('disabled', true);} else { throw "error"}
      if (game.allChoicesMade() === true) {$("#choiceList").addClass("hidden");}
    });

  });

});
