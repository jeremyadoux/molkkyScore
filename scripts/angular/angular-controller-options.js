app.controller("angular-modal-options", ['$scope','GameData','$rootScope', function($scope,GameData,$rootScope) {
    $scope.restartGame = function(){
        $('#mainTable').fadeOut(1000);
        if(GameData.gameHasWinner()){ 
            $('#modalOptions').modal('hide');
            $('.loading-title').text(eval("loading."+$scope.language+".restartGame"));
            $('.loader-container').show();
            GameData.resetPlayers();
            setTimeout(function(){
                $('.loader-container').hide();
                $rootScope.$broadcast('initializeGameBoard'); //generate 'initializeGameBoard' event
            }, loadingTime);
        }
        else{ //ask confirmation
            $('#modalOptions').modal('hide');
            GameData.setConfirmType('Restart');
            $rootScope.$broadcast('initializeConfirm');
        }   	
    };
    $scope.newGame = function(){
        $('#mainTable').fadeOut(1000);
    	$('#modalOptions').modal('hide');
        $rootScope.$broadcast('initializeNewPlayers');
    };
    $scope.undoLast = function(){
    	GameData.undoLastThrow();
    	$('#modalOptions').modal('hide');
    	$rootScope.$broadcast('updateGameBoard'); //generate 'updateGameBoard' event
    };
    $scope.exitGame = function(){
        $('#mainTable').fadeOut(1000);
        if(GameData.gameHasWinner() || $scope.isTutorial){ 
            GameData.emptyPlayersArray();
            $('#mainTable').fadeOut(1000);
            $('#modalOptions').modal('hide');
            $('#modalStart').modal('show');
        }
        else{ //ask confirmation
            $('#modalOptions').modal('hide');
            GameData.setConfirmType('Exit');
            $rootScope.$broadcast('initializeConfirm');
        }
    };

    //events
    $scope.$on('initializeOptions', function (event) {
        $scope.language = GameData.getLanguage();
        setTextModalOptions($scope.language);
        $scope.gameStarted = GameData.gameHasStarted();
        $scope.isTutorial = GameData.isTutorial();
        $scope.isTutorialStepFive = GameData.isTutorialStepFive();
        $('#modalOptions').modal('show');
    });
}]);