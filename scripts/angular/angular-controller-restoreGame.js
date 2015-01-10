app.controller("angular-modal-restoreGame", ['$scope', '$rootScope', function($scope, $rootScope) {	
	$scope.btnYes = function(){
		$('#restoreGame').modal('hide');
		$('.loading-title').text(loading.restoreGame);
        $('.loader-container').show();
        setTimeout(function(){
            $('.loader-container').hide();
            $rootScope.$broadcast('restoreGameBoard'); //generate 'restoreGameBoard' event
        }, loadingTime);
    };
    $scope.btnNo = function(){
        setIsRestoreGame(false);
        $('#restoreGame').modal('hide');
        showModal('#modalStart');
    };
}]);