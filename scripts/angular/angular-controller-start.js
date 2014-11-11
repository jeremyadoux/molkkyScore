$(document).ready(function() {
	setTimeout(function(){
		$('.loader-container').hide();
		showModal('#modalStart');
	},loadingTime);
});

app.controller("angular-modal-start", function($scope,$rootScope) {
    $scope.quickGame = function(){
    	$('#modalStart').modal('hide');
    	$rootScope.$broadcast('initializeAddPlayers'); //generate 'initializeAddPlayers' event
    };
});
