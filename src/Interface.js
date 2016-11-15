var game = new Game();

$(document).ready(function() {

  var count = 1;

  this.$newPlayers = $('#newPlayers');

  this.$newPlayers.click(function(event) {
    event.preventDefault();
    addPlayers();
    generateBetForm();
    generateChoiceForm();
    generateLeaderboard();
    placeBet();
    placeChoice();
  });

  $("#turn").html( "Turn " + count );
  $("#gameState").html( "Adding Players" );

  var generateBetForm = function() {
    var betTextBoxArray = []
    $.each(game.players, function(intIndex, objValue) {
      if (objValue.money != 'Out') {
        betTextBoxArray.push( "<h3>" + "Player " +  (intIndex + 1) + " insert your bet" + "</h3>" + "<textarea id=" + 'bet' + intIndex + "></textarea>" + "<button class='btn btn-primary', id=" + 'betButton' + intIndex + ">Ok</button>" );
      }
    $("#betList").html(betTextBoxArray);
    });
  }

  var generateChoiceForm = function() {
    var choiceTextBoxArray = []
    $.each(game.players, function(intIndex, objValue) {
      if (objValue.money != 'Out') {
        choiceTextBoxArray.push( "<h3>" + "Player " +  (intIndex + 1) + " insert your choice" + "</h3>" + "<textarea id=" + 'choice' + intIndex + "></textarea>" + "<button class='btn btn-primary', id=" + 'choiceButton' + intIndex + ">Ok</button>" );
      }
      $("#choiceList").html(choiceTextBoxArray);
    });
  }

  var addPlayers = function() {
    game.addPlayer($("#newPlayersValue").val());
    $("#gameState").html("Collecting Bets");
    $("#startList").removeClass("hidden");
    $("#newPlayersDiv").addClass("hidden");
  }

  var generateLeaderboard = function() {
    var html = []
    html.push("<h2 class='text-danger'>Leaderboard</h2>")
    $.each(game.players, function(intIndex, objValue) {
      var money = "£" + objValue.money
      html.push("<h3> Player " +  (intIndex + 1) + ": " + money + "</h3>");
    });
    $("#startList").html(html);
  }

  var placeBet = function() {
    $.each(game.players, function(intIndex, objValue) {
      $(".container").on('click', "#" + 'betButton' + intIndex + "", function () {
        if (game.placeBet(objValue, $("#" + 'bet' + intIndex + "").val())) {
          $("#" + 'betButton' + intIndex + "").prop('disabled', true);
        }
        if (game.allBetsMade()) {
          $("#betList").addClass("hidden");
          $("#choiceList").removeClass("hidden");
        }
      });
    });
  };

  var placeChoice = function() {
    $.each(game.players, function(intIndex, objValue) {
      $(".container").on('click', "#" + 'choiceButton' + intIndex + "", function () {
        if (game.makeChoice(objValue, $("#" + 'choice' + intIndex + "").val())) {
          $("#" + 'choiceButton' + intIndex + "").prop('disabled', true);
        }
        if (game.allChoicesMade()) {
          houseRolls();
        }
      });
    });
  }

  var houseRolls = function() {
    $("#gameState").html( "House Rolling" );
    $("#choiceList").addClass("hidden");
    $("#dice").removeClass("hidden");
    var diceValue = game.rollDice()
    $("#diceMessage").text("The dice have been rolled and their value is " + diceValue + "");
    displayWinners();
    checkIfPlayerIsOut();
    generateLeaderboard();
    resetChoices();
  }

  var resetChoices = function() {
     game.resetChoices();
  }

  var checkIfPlayerIsOut = function() {
    $.each(game.players, function(intIndex, objValue) {
      game.checkIfPlayerIsOut(objValue)
    });
  }

  var displayWinners = function() {
    var winners = game.determineWinners()
    var winningPlayers = $.map(winners, function(value) {
      return value + 1
    }).join( " and " );
    if(winners.length === 0) {
      var message = "Nobody won this turn!"
    } else {
      var message = "Player " + winningPlayers + " are the lucky ones"
    }
    $("#winnerMessage").text("" + message + "");
  }

  $("#nextButton").click( function() {
    $("#dice").addClass("hidden");

    count++;
    
    if (count === 11) {
      $("#betList, #turn").addClass("hidden");
      $("#gameOver").removeClass("hidden");
      $("#gameState").html( "Finished" );
      var message = game.determineFinalWinner()
      $("#finalMessage").text( "Player " + (message + 1) + " has won!" );
    } else {
      generateBetForm();
      generateChoiceForm();
      $("#betList").removeClass("hidden");
      $("#gameState").html( "Collecting Bets" ); 
      $("#turn").html( "Turn " + count );
    }
  
  });

});
