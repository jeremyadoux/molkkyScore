app.controller("angular-newPlayers", function($scope,GameData,$rootScope) {	
	$scope.btnYes = function(){ //same players
        GameData.getPlayers().sort(comparePlayerScores);
        GameData.resetPlayers();
        $('#modalNewPlayers').modal('hide');
        $rootScope.$broadcast('initializeGameBoard'); //generate 'initializeGameBoard' event
    };
    $scope.btnNo = function(){ //other players
    	$('#mainTable').fadeOut(1000);
        GameData.emptyPlayersArray();
        $('#modalNewPlayers').modal('hide');
        $rootScope.$broadcast('initializeAddPlayers'); //generate 'initializeAddPlayers' event
    };
    $scope.btnCancel = function(){
       $('#modalNewPlayers').modal('hide');
    };

    $scope.$on('initializeNewPlayers', function (event) {
        $scope.stillPlayersInTheGame = GameData.stillPlayersInTheGame();
        $('#modalNewPlayers').modal('show');
    });
});