var game = new Game();

$(document).ready(function() {

  $.each(game.players, function( intIndex, objValue ) {
    $("#list").append($( "<h3>" + "Player " +  (intIndex + 1) + ": " + "£" + objValue.money + "</h3>" ));
  });

  $.each(game.players, function( intIndex, objValue ) {
    $("#list").append($( "<h3>" + "Player " +  (intIndex) + " insert your bet" + "</h3>" + "<textarea id=" + 'bet' + intIndex + "></textarea>" + "<button id=" + 'button' + intIndex + ">Ok</button>" ));

    $("#" + 'button' + intIndex + "").click(function() {
      var answer = game.placeBet(objValue, $("#" + 'bet' + intIndex + "").val());
      if (answer === true) {$("#" + 'button' + intIndex + "").prop('disabled', true);} else { throw "error"}
      console.log(answer);
    });

  });

});
