var game = new Game();

$(document).ready(function() {

  // $("#newPlayers").click(function() {
  //   value = $("#newPlayersValue").val();
  //   game.addPlayer(value);
  //   $.each(game.players, function( intIndex, objValue ) {
  //     $("#list").append($( "<h3>" + "Player " +  (intIndex) + ": " + "£" + objValue.money + "</h3>" ));
  //   });
  //   $("#newPlayersDiv").addClass("hidden");
  //   $("#betList").removeClass("hidden");
  // });

  var count = 1;
  $("#turn").html( "Turn " + count );
  $("#gameState").html( "Collecting Bets" );
  $.each(game.players, function( intIndex, objValue ) {
    $("#startList").append($( "<h3>" + "Player " +  (intIndex + 1) + ": " + "£" + objValue.money + "</h3>" ));
  });

  $.each(game.players, function( intIndex, objValue ) {
    $("#betList").append($( "<h3>" + "Player " +  (intIndex + 1) + " insert your bet" + "</h3>" + "<textarea id=" + 'bet' + intIndex + "></textarea>" + "<button class='btn btn-primary', id=" + 'betButton' + intIndex + ">Ok</button>" ));

    $("#" + 'betButton' + intIndex + "").click(function() {
      if (game.placeBet(objValue, $("#" + 'bet' + intIndex + "").val())) {
        $("#" + 'betButton' + intIndex + "").prop('disabled', true);
      } else {
        throw "error"
      }
      
      if (game.allBetsMade()) {
        $("#betList").addClass("hidden");
        $("#choiceList").removeClass("hidden");
      }

    });

    $("#choiceList").append($( "<h3>" + "Player " +  (intIndex + 1) + " insert your choice" + "</h3>" + "<textarea id=" + 'choice' + intIndex + "></textarea>" + "<button class='btn btn-primary', id=" + 'choiceButton' + intIndex + ">Ok</button>" ));
    $("#" + 'choiceButton' + intIndex + "").click(function() {
      if (game.makeChoice(objValue, $("#" + 'choice' + intIndex + "").val())) {
        $("#" + 'choiceButton' + intIndex + "").prop('disabled', true);
      } else {
        throw "error"
      }

      if (game.allChoicesMade()) {
        $("#gameState").html( "House Rolling" );
        $("#choiceList").addClass("hidden");
        $("#dice").removeClass("hidden");
        $("#diceMessage").text("The dice have been rolled and their value is " + game.rollDice() + "");
        var winners = game.determineWinners()
        game.resetChoices();
        
        var something = $.each(winners, function( intIndex, objValue ) {
        });

        if(winners.length === 0) {
          var message = "Nobody won this turn!"
        } else {
          var message = "? are the lucky ones"
        }

        $("#winnerMessage").text("" + message + "");
        
        $(".btn").prop('disabled', false);

      var html = []
      $.each(game.players, function( intIndex, objValue ) {
        html.push("<h2>" + "Player " +  (intIndex + 1) + ": " + "£" + objValue.money + "</h2>");
      });
      $("#startList").html(html);

      }

    });

  });

  $("#nextButton").click( function() {
    $("#dice").addClass("hidden");
    
    count++;
    
    if (count === 11) {
      $("#betList").addClass("hidden");
      $("#turn").addClass("hidden");
      $("#gameOver").removeClass("hidden");
      $("#gameState").html( "Finished" ); 
    } else {
      $("#betList").removeClass("hidden");
      $("#gameState").html( "Collecting Bets" ); 
      $("#turn").html( "Turn " + count );
    }
  
  });

});
