app.controller("angular-newPlayers", function($scope,GameData,$rootScope) {	
	$scope.btnYes = function(){ //same players
        GameData.getPlayers().sort(comparePlayerScores);
        GameData.resetPlayers();
        $('#modalNewPlayers').modal('hide');
        $('.loading-title').text(loading.newGame);
        $('.loader-container').show();
        setTimeout(function(){
            $('.loader-container').hide();
             $rootScope.$broadcast('initializeGameBoard'); //generate 'initializeGameBoard' event
        },loadingTime);
    };
    $scope.btnNo = function(){ //other players
        GameData.emptyPlayersArray();
        $('#modalNewPlayers').modal('hide');
        $rootScope.$broadcast('initializeAddPlayers'); //generate 'initializeAddPlayers' event
    };
    $scope.btnCancel = function(){
        $('#mainTable').fadeIn(1000);
       $('#modalNewPlayers').modal('hide');
    };

    $scope.$on('initializeNewPlayers', function (event) {
        $scope.stillPlayersInTheGame = GameData.stillPlayersInTheGame();
        $('#modalNewPlayers').modal('show');
    });
});