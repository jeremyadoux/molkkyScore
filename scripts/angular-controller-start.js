$(document).ready(function() {
	$('#modalStart').modal({
			keyboard: false, // prevent modal from closing with ESC key 
			backdrop: 'static'}, // prevent modal from closing with outside click 
		'show');
});

app.controller("angular-modal-start", function($scope,$rootScope) {
    $scope.quickGame = function(){
    	$('#modalStart').modal('hide');
    	$rootScope.$broadcast('initializeAddPlayers'); //generate 'initializeAddPlayers' event
    };
});