app.controller("angular-modal-confirm", function($scope,GameData,$rootScope) {	
	$scope.btnYes = function(){
        if(GameData.getConfirmType() == 'Exit'){
            GameData.emptyPlayersArray();
            $('#mainTable').fadeOut(1000);
            $('#modalConfirm').modal('hide');
            $('#modalStart').modal('show');
        }
        else if(GameData.getConfirmType() == 'Restart'){
            $('#modalConfirm').modal('hide');
            $('.loading-title').text(loading.restartGame);
            $('.loader-container').show();
            GameData.resetPlayers();
            setTimeout(function(){
                $('.loader-container').hide();
                $rootScope.$broadcast('initializeGameBoard'); //generate 'initializeGameBoard' event
            }, loadingTime);
        }
        setIsRestoreGame(false);
        GameData.resetConfirmType();
    };
    $scope.btnNo = function(){
        $('#modalConfirm').modal('hide');
        $('#mainTable').fadeIn(1000);
    };

    //events
    $scope.$on('initializeConfirm', function (event) {
        $('#modalConfirm .modal-header h2').text(GameData.getConfirmType() + ' game');
    	$('#modalConfirm').modal('show');
    });
});