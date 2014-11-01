app.controller("angular-modal-addPlayers", function($scope, GameData, $rootScope) {
    $scope.addPlayer = function(){
        var newPlayerName = $('#modalAddPlayers input').val();
        if(validatePlayerName(newPlayerName,$scope.players,$('#modalAddPlayers .alert'))){
            GameData.addPlayerToGame(newPlayerName);
            $('#modalAddPlayers input').val('');
            $('#modalAddPlayers input').focus();
        }   	
    };
    $scope.shufflePlayers = function(){
        var currentIndex = $scope.players.length, temporaryValue, randomIndex ;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = $scope.players[currentIndex];
            $scope.players[currentIndex] = $scope.players[randomIndex];
            $scope.players[randomIndex] = temporaryValue;
          }
        GameData.resetPlayerIndexes();
    };
    $scope.btnReady = function(){
    	if($scope.players.length > 1){
			$('#modalAddPlayers').modal('hide');
            addNewPlayerNamesToLocalStorage($scope.players);
            $rootScope.$broadcast('initializeGameBoard'); //generate 'initializeGameBoard' event
		}
		else{
			warn($('#modalAddPlayers .alert'),warnings.playerName.tooFew);
            $('#modalAddPlayers input').focus();
		}
    };
    $scope.btnRemovePlayer = function(index){
        $scope.players.splice(index,1);
        GameData.resetPlayerIndexes();
    };

    //events
    $scope.$on('initializeAddPlayers', function (event) {
        $scope.players = GameData.getPlayers();
        initializeAddPlayersModal();
    });
});
/**
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
*/