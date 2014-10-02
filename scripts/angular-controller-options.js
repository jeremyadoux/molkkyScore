app.controller("angular-modal-options", function($scope,GameData,$rootScope) {
    $scope.restartGame = function(){
    	GameData.resetPlayers();
    	$('#modalOptions').modal('hide');
    	$rootScope.$broadcast('initializeGameBoard'); //generate 'initializeGameBoard' event
    };
    $scope.newGame = function(){
    	$('#mainTable').fadeOut(1000);
    	$('#modalOptions').modal('hide');
		$('#modalNewPlayers').modal('show');
    };
    $scope.undoLast = function(){
    	GameData.undoLastThrow();
    	$('#modalOptions').modal('hide');
    	$rootScope.$broadcast('updateGameBoard'); //generate 'updateGameBoard' event
    };
    $scope.exitGame = function(){
    	GameData.emptyPlayersArray();
    	$('#mainTable').fadeOut(1000);
    	$('#modalOptions').modal('hide');
		$('#modalStart').modal('show');
    };

    //events
    $scope.$on('initializeOptions', function (event) {
        $scope.gameStarted = GameData.gameHasStarted();
        $('#modalOptions').modal('show');
    });
});