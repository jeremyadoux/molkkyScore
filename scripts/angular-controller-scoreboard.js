app.controller("angular-scoreboard", function($scope,GameData,$rootScope) {	
	$scope.btnNewGame = function(){
		$('#modalScoreboard').modal('hide');
        $rootScope.$broadcast('initializeNewPlayers');
    };
    $scope.btnExit = function(){
    	if(GameData.gameHasWinner()){ 
    		GameData.emptyPlayersArray();
	    	$('#mainTable').fadeOut(1000);
	    	$('#modalScoreboard').modal('hide');
			$('#modalStart').modal('show');
    	}
    	else{ //ask confirmation
    		$('#modalScoreboard').modal('hide');
    		GameData.setConfirmType('Exit');
    		$rootScope.$broadcast('initializeConfirm');
    	}
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