var game = new Game();

$(document).ready(function() {

  $.each(game.players, function( intIndex, objValue ) {
    $("#list").append($( "<h3>" + "Player " +  (intIndex + 1) + ": " + "£" + objValue.money + "</h3>" ));
  });

  $.each(game.players, function( intIndex, objValue ) {
    $("#list").append($( "<h3>" + "Player " +  (intIndex) + " insert your bet" + "</h3>" + "<textarea id='bet'></textarea>" + "<button id='button'>Ok</button>" ));
  });

  $('#button').click(function() {
    console.log($('#bet').val());
    game.placeBet(objValue, $('#bet').val());
  });

});
