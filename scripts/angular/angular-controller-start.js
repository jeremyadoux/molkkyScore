$(document).ready(function() {
	$('.loader-container').show();
	setTimeout(function(){
		$('.loader-container').hide();
		if(isRestoreGame()){
			showModal('#restoreGame');
		}
    	else{
    		showModal('#modalStart');
    	}
	},loadingTime);
});

app.controller("angular-modal-start", function($scope,$rootScope) {
    $scope.startGame = function(){
    	$('#modalStart').modal('hide');
    	$rootScope.$broadcast('initializeAddPlayers'); //generate 'initializeAddPlayers' event
    };
});
