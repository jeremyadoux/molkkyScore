$(document).ready(function() {
	showModalWithLoader('#modalStart', loading.startApp);
});

app.controller("angular-modal-start", function($scope,$rootScope) {
    $scope.quickGame = function(){
    	$('#modalStart').modal('hide');
    	$rootScope.$broadcast('initializeAddPlayers'); //generate 'initializeAddPlayers' event
    };
});
