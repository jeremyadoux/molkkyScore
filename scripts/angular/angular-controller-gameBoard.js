app.controller("angular-gameBoard", function($scope,GameData,$rootScope) {
	$scope.toggleNumber = function(number){
		/* begin: bosklapper stuff */
		if(GameData.getBosklappersMode()){
			if(number == 0) {
				setBillyChar();
			}
			else{
				toggleNumberActivationBosklappers(number);
			}		
		}
		/* end: bosklapper stuff */

		else toggleNumberActivation(number);

		/* begin: bosklapper stuff */
		/* activation */
		if(!GameData.gameHasStarted() && number == 0 && !GameData.getBosklappersMode()){
			if(checkBosklappersActivationCount(false)){
				GameData.setBosklappersMode(true);
				$('#td-0').removeClass('active');
				$('#td-player-name').removeClass('active');
				$rootScope.$broadcast('initializeBosklappers'); //generate 'initializeBosklappers' event
			}
		}
		if(number != 0)	checkBosklappersActivationCount(true);
		/* end: bosklapper stuff */		
    };
    $scope.options = function(number){
    	/* begin: bosklapper stuff */
    	checkBosklappersActivationCount(true);
    	/* end: bosklapper stuff */

    	$("#td-options img").addClass("animate-spin");
    	setTimeout(function(){
    		$("#td-options img").removeClass("animate-spin");
    	},2500);
		$rootScope.$broadcast('initializeOptions'); //generate 'initializeOptions' event
    };
    $scope.showScoreboard = function(number){
    	/* begin: bosklapper stuff */
    	checkBosklappersActivationCount(true);
    	/* end: bosklapper stuff */

		$rootScope.$broadcast('initializeScoreboard'); //generate 'initializeScoreboard' event
    };
	$scope.processThrow = function(){
		/* begin: bosklapper stuff */
    	checkBosklappersActivationCount(true);
    	if(GameData.getBosklappersMode()){
    		if($('#mainTable #td-player-name').hasClass("active")){
				//calculate new score
				var scoreNumber = -1;
				if ($("#mainTable .td-score-number.active")[0]){
					scoreNumber = parseInt($('#mainTable .td-score-number.active').text());
				}
				if(scoreNumber == 0){
					processMissBosklappers($scope.activePlayer);
				}
				else{
					processScoreBosklappers($scope.activePlayer, scoreNumber);
					if($scope.activePlayer.outOfTheGame){
						GameData.setRanking($scope.activePlayer);
						if($scope.activePlayer.winner){
							setIsRestoreGame(false);
							clearLocalStorageGameData();
							$rootScope.$broadcast('initializeScoreboard'); //generate 'initializeScoreboard' event
						}
					}
				}

				//go to next player
				$scope.activePlayer.myTurn = false;
				if(GameData.stillPlayersInTheGame()){
					var nextPlayer = GameData.getNextInGamePlayer($scope.activePlayer.index);						
					nextPlayer.myTurn = true;
					if(nextPlayer.index <= $scope.activePlayer.index){
						$scope.data.throwNumber++;
					}
					$scope.activePlayer = nextPlayer;
				}
				else{
					$rootScope.$broadcast('initializeScoreboard'); //game finished
				}
				$('#mainTable #td-player-name').removeClass("active");
				$('#mainTable .td-score-number.active').removeClass("active");
				$('#mainTable .td-score-number.active').removeClass("active");
				$('#mainTable #td-0.billyHalf').removeClass("billyHalf").text('0');
				$('#mainTable #td-0.billySuper').removeClass("billySuper").text('0');
			}
    	}
    	/* end: bosklapper stuff */
    	else{
    		if($('#mainTable #td-player-name').hasClass("active")){
				//calculate new score
				var scoreNumber = parseInt($('#mainTable .td-score-number.active').text());
				if(scoreNumber == 0){
					processMiss($scope.activePlayer);
				}
				else{
					processScore($scope.activePlayer,scoreNumber);
					if($scope.activePlayer.outOfTheGame){
						GameData.setRanking($scope.activePlayer);
						if($scope.activePlayer.winner){
							setIsRestoreGame(false);
							$rootScope.$broadcast('initializeScoreboard'); //generate 'initializeScoreboard' event
						}
					}
				}

				//go to next player
				$scope.activePlayer.myTurn = false;
				if(GameData.stillPlayersInTheGame()){
					var nextPlayer = GameData.getNextInGamePlayer($scope.activePlayer.index);						
					nextPlayer.myTurn = true;
					if(nextPlayer.index <= $scope.activePlayer.index){
						$scope.data.throwNumber++;
					}
					$scope.activePlayer = nextPlayer;
				}
				else{
					$rootScope.$broadcast('initializeScoreboard'); //game finished
				}
				$('#mainTable #td-player-name').removeClass("active");
				$('#mainTable .td-score-number.active').removeClass("active");
			}
    	}
    	/* write gameData to localStorage*/
    	if(!GameData.gameHasWinner()){
    		writeGameDataToLocalStorage($scope.players, $scope.data);
    	}
    };

    //events
	$scope.$on('initializeGameBoard', function (event) {
	    $scope.players = GameData.getPlayers();
	    $scope.players[0].myTurn = true;
	    $scope.activePlayer = $scope.players[0];
	    GameData.resetThrowNumber();
	    $scope.data = GameData.getData();
	    initializeMainTable($scope.players.length);
	    $scope.$apply();
	    $('#modalScoreboard').on('shown.bs.modal', function (e) {
		  	$('#modalScoreboard #scoreboardDetails th').css({width:100/$scope.players.length+"%"});
		  	$('#modalScoreboard #scoreboardDetails td').css({width:100/$scope.players.length+"%"});
		});
	});
	$scope.$on('updateGameBoard', function (event) {
	    $scope.players = GameData.getPlayers();
	    $scope.activePlayer = GameData.getActivePlayer();
	    $scope.data = GameData.getData(); 
	    if(!GameData.gameHasWinner()){
            writeGameDataToLocalStorage($scope.players, $scope.data);
        }
	});
	$scope.$on('restoreGameBoard', function (event) {
		var players= [];
		var data = {};
		if(localStorage.getItem("players") && localStorage.getItem("data")){
			players = JSON.parse(localStorage.getItem("players"));
			data = JSON.parse(localStorage.getItem("data"));
		}
		else{
			$rootScope.$broadcast('initializeAddPlayers');
			return;
			//TODO: error message
		}
		GameData.setPlayers(players);
		GameData.setData(data);
	    $scope.players = GameData.getPlayers();
	    $scope.data = GameData.getData();
	    $scope.activePlayer = GameData.getActivePlayer();
	    initializeMainTable($scope.players.length);
	    $scope.$apply();
	    $('#modalScoreboard').on('shown.bs.modal', function (e) {
		  	$('#modalScoreboard #scoreboardDetails th').css({width:100/$scope.players.length+"%"});
		  	$('#modalScoreboard #scoreboardDetails td').css({width:100/$scope.players.length+"%"});
		});
	});
});