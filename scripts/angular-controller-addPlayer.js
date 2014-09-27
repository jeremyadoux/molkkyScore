app.controller("angular-modal-addPlayers", function($scope, GameData, $rootScope) {
    $scope.addPlayer = function(){
    	var newPlayerName = $('#modalAddPlayers input').val();
		if(validatePlayerName(newPlayerName,$scope.players,$('#modalAddPlayers .alert'))){
			GameData.addPlayerToGame(newPlayerName);
			$scope.players = GameData.getPlayers();
			$('#modalAddPlayers input').val('');
			$('#modalAddPlayers input').attr('placeholder','Player '+ ($scope.players.length + 1));
			$('#modalAddPlayers input').focus();
		}
    };
    $scope.btnReady = function(){
    	if($scope.players.length > 1){
			$('#modalAddPlayers').modal('hide');
            $rootScope.$broadcast('initializeGameBoard'); //generate 'initializeGameBoard' event
		}
		else{
			warn($('#modalAddPlayers .alert'),warnings.playerName.tooFew);
            $('#modalAddPlayers input').focus();
		}
    };

    //events
    $scope.$on('initializeAddPlayers', function (event) {
        $scope.players = GameData.getPlayers();
        initializeAddPlayersModal();
    });
});

//custom directive: keypress enter 
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});