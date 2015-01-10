app.controller("angular-newPlayers", ['$scope','GameData','$rootScope', function($scope,GameData,$rootScope) {	
	$scope.btnYes = function(){ //same players
        GameData.getPlayers().sort(comparePlayerScores);
        GameData.resetPlayers();
        $('#modalNewPlayers').modal('hide');
        $('.loading-title').text(eval("loading."+$scope.language+".newGame"));
        $('.loader-container').show();
        setTimeout(function(){
            $('.loader-container').hide();
             $rootScope.$broadcast('initializeGameBoard'); //generate 'initializeGameBoard' event
        },loadingTime);
        setIsRestoreGame(false);
    };
    $scope.btnNo = function(){ //other players
        GameData.emptyPlayersArray();
        $('#modalNewPlayers').modal('hide');
        $rootScope.$broadcast('initializeAddPlayers'); //generate 'initializeAddPlayers' event
        setIsRestoreGame(false);
    };
    $scope.btnCancel = function(){
        $('#mainTable').fadeIn(1000);
       $('#modalNewPlayers').modal('hide');
    };

    $scope.$on('initializeNewPlayers', function (event) {
        $scope.language = GameData.getLanguage();
        setTextModalNewPlayers($scope.language);
        $scope.stillPlayersInTheGame = GameData.stillPlayersInTheGame();
        $('#modalNewPlayers').modal('show');
    });
}]);