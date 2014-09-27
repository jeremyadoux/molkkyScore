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
	    if(!GameData.stillPlayersInTheGame()){
	    	initializeScoreboardModalEndedGame();
		}
		else{
			initializeScoreboardModalContinuableGame();
		}
	});
});