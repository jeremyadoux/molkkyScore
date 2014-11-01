app.controller("angular-scoreboard", function($scope,GameData) {	
	$scope.btnNewGame = function(){
		$('#mainTable').fadeOut(1000);
    	$('#modalScoreboard').modal('hide');
		$('#modalNewPlayers').modal('show');
    };
    $scope.btnExit = function(){
    	GameData.emptyPlayersArray();
    	$('#mainTable').fadeOut(1000);
    	$('#modalScoreboard').modal('hide');
		$('#modalStart').modal('show');
    };

    //events
	$scope.$on('initializeScoreboard', function (event) {
	    $scope.players = GameData.getPlayers();
	    // set number of table rows in details pane
	    $scope.throwNumberArrayForNgRepeat = new Array(getNumberOfScoreDetailsRows());
	    if(!GameData.stillPlayersInTheGame()){
	    	initializeScoreboardModalEndedGame();
		}
		else{
			initializeScoreboardModalContinuableGame();
		}
	});

	function getNumberOfScoreDetailsRows(){
		var numberOfRows = 0;
		for(var i = 0; i < $scope.players.length; i++){
			if($scope.players[i].scoreHistory.length > numberOfRows){
				numberOfRows = $scope.players[i].scoreHistory.length
			}
		}
		return numberOfRows;
	}
});