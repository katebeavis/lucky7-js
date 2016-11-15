var game = new Game();

$(document).ready(function() {

  var count = 1;
  $("#turn").html( "Turn " + count );
  $("#gameState").html( "Adding Players" );

  var createBetForm = function() {
    var betTextBoxArray = []
    $.each(game.players, function(intIndex, objValue) {
      if (objValue.money != 'Out') {
        betTextBoxArray.push( "<h3>" + "Player " +  (intIndex + 1) + " insert your bet" + "</h3>" + "<textarea id=" + 'bet' + intIndex + "></textarea>" + "<button class='btn btn-primary', id=" + 'betButton' + intIndex + ">Ok</button>" );
      }
    $("#betList").html(betTextBoxArray);
    });
  }

  var createChoiceForm = function() {
    var choiceTextBoxArray = []
    $.each(game.players, function(intIndex, objValue) {
      if (objValue.money != 'Out') {
        choiceTextBoxArray.push( "<h3>" + "Player " +  (intIndex + 1) + " insert your choice" + "</h3>" + "<textarea id=" + 'choice' + intIndex + "></textarea>" + "<button class='btn btn-primary', id=" + 'choiceButton' + intIndex + ">Ok</button>" );
      }
      $("#choiceList").html(choiceTextBoxArray);
    });
  }

  $("#newPlayers").click(function() {
    value = $("#newPlayersValue").val();
    game.addPlayer(value);
    $("#gameState").html( "Collecting Bets" );
    $("#startList").removeClass("hidden");
    $.each(game.players, function(intIndex, objValue) {
      var money = "£" + objValue.money
      $("#startList").append($( "<h3>" + "Player " +  (intIndex + 1) + ": " + money + "</h3>" ));
      
      $(".container").on('click', "#" + 'betButton' + intIndex + "", function () {
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
      createChoiceForm();
      $(".container").on('click', "#" + 'choiceButton' + intIndex + "", function () {
        if (game.makeChoice(objValue, $("#" + 'choice' + intIndex + "").val())) {
          $("#" + 'choiceButton' + intIndex + "").prop('disabled', true);
        } else {
          throw "error"
        }

        if (game.allChoicesMade()) {
          $("#gameState").html( "House Rolling" );
          $("#choiceList").addClass("hidden");
          $("#dice").removeClass("hidden");
          var diceValue = game.rollDice()
          $("#diceMessage").text("The dice have been rolled and their value is " + diceValue + "");
          var winners = game.determineWinners()
          $.each(game.players, function(intIndex, objValue) {
            game.checkIfPlayerIsOut(objValue)
          });
          game.resetChoices();
          
          var winningPlayers = $.map(winners, function(value) {
            return value + 1
          }).join( " and " );
          if(winners.length === 0) {
            var message = "Nobody won this turn!"
          } else {
            var message = "Player " + winningPlayers + " are the lucky ones"
          }

          $("#winnerMessage").text("" + message + "");
          
          $(".btn").prop('disabled', false);

        var html = []
        $.each(game.players, function(intIndex, objValue) {
          var money = "£" + objValue.money
          html.push("<h2>" + "Player " +  (intIndex + 1) + ": " + money + "</h2>");
        });
        $("#startList").html(html);

        }

      });
      createBetForm();
      $("#newPlayersDiv").addClass("hidden");
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
      var message = game.determineFinalWinner()
      $("#finalMessage").text( "Player " + (message + 1) + " has won!" );
    } else {
      createBetForm();
      createChoiceForm();
      $("#betList").removeClass("hidden");
      $("#gameState").html( "Collecting Bets" ); 
      $("#turn").html( "Turn " + count );
    }
  
  });

});
