app.controller("angular-gameBoard", function($scope,GameData,$rootScope) {	
	$scope.toggleNumber = function(number){
		toggleNumberActivation(number);
    };
    $scope.options = function(number){
		$rootScope.$broadcast('initializeOptions'); //generate 'initializeOptions' event
    };
	$scope.processThrow = function(){
    	if($('#mainTable #td-player-name').hasClass("active")){
			//calculate new score
			var scoreNumber = parseInt($('#mainTable .td-score-number.active').text());
			if(scoreNumber == 0){
				$scope.activePlayer.processMiss();
			}
			else{
				$scope.activePlayer.processScore(scoreNumber);
				if($scope.activePlayer.outOfTheGame){
					GameData.setRanking($scope.activePlayer);
					if($scope.activePlayer.winner){
						$rootScope.$broadcast('initializeScoreboard'); //generate 'initializeScoreboard' event
					}
				}
			}

			//go to next player
			$scope.activePlayer.myTurn = false;
			if(GameData.stillPlayersInTheGame()){
				var nextPlayer = GameData.getNextInGamePlayer($scope.activePlayer.index);						
				nextPlayer.myTurn = true;
				$scope.activePlayer = nextPlayer;
			}
			else{
				$rootScope.$broadcast('initializeScoreboard'); //generate 'initializeScoreboard' event
			}
			$('#mainTable #td-player-name').removeClass("active");
			$('#mainTable .td-score-number.active').removeClass("active");
		}
    };

    //events
	$scope.$on('initializeGameBoard', function (event) {
	    $scope.players = GameData.getPlayers();
	    $scope.players[0].myTurn = true;
	    $scope.activePlayer = $scope.players[0];
	    initializeMainTable($scope.players.length);
	});
	$scope.$on('updateGameBoard', function (event) {
	    $scope.players = GameData.getPlayers();
	    $scope.activePlayer = GameData.getActivePlayer();
	});
});