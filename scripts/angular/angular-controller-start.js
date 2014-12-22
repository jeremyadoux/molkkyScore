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

	// reopen 'start' modal on closing 'about' modal
	$('#modalAbout').on('hidden.bs.modal', function (e) {
		showModal('#modalStart');
	});
});

app.controller("angular-modal-start", function($scope,$rootScope) {
    $scope.startGame = function(){
    	$('#modalStart').modal('hide');
    	$rootScope.$broadcast('initializeAddPlayers'); //generate 'initializeAddPlayers' event
    };
    $scope.about = function(){
    	$('#modalStart').modal('hide');
    	$('#modalAbout').modal('show');
    };
});


