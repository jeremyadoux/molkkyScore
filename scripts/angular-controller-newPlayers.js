app.controller("angular-newPlayers", function($scope,GameData,$rootScope) {	
	$scope.btnYes = function(){
		GameData.emptyPlayersArray();
    	$('#modalNewPlayers').modal('hide');
    	$rootScope.$broadcast('initializeAddPlayers'); //generate 'initializeAddPlayers' event
    };
    $scope.btnNo = function(){
    	GameData.getPlayers().sort(comparePlayerScores);
		GameData.resetPlayers();
    	$('#modalNewPlayers').modal('hide');
		$rootScope.$broadcast('initializeGameBoard'); //generate 'initializeGameBoard' event
    };
});