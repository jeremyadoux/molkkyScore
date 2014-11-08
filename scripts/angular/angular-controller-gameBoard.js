app.controller("angular-gameBoard", function($scope,GameData,$rootScope) {	
	$scope.toggleNumber = function(number){
		toggleNumberActivation(number);
    };
    $scope.options = function(number){
    	$("#td-options img").addClass("animate-spin");
    	setTimeout(function(){
    		$("#td-options img").removeClass("animate-spin");
    	},2500);
		$rootScope.$broadcast('initializeOptions'); //generate 'initializeOptions' event
    };
    $scope.showScoreboard = function(number){
		$rootScope.$broadcast('initializeScoreboard'); //generate 'initializeScoreboard' event
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
    };

    //events
	$scope.$on('initializeGameBoard', function (event) {
	    $scope.players = GameData.getPlayers();
	    $scope.players[0].myTurn = true;
	    $scope.activePlayer = $scope.players[0];
	    GameData.resetThrowNumber();
	    $scope.data = GameData.getData();
	    initializeMainTable($scope.players.length);
	    $('#td-player-name').click(); // dirty trick for rendering ng-repeat
	    $('#modalScoreboard').on('shown.bs.modal', function (e) {
		  	$('#modalScoreboard #scoreboardDetails th').css({width:100/$scope.players.length+"%"});
		  	$('#modalScoreboard #scoreboardDetails td').css({width:100/$scope.players.length+"%"});
		});
	});
	$scope.$on('updateGameBoard', function (event) {
	    $scope.players = GameData.getPlayers();
	    $scope.activePlayer = GameData.getActivePlayer();
	    $scope.data = GameData.getData(); 
	});
});