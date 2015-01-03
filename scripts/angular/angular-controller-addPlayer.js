app.controller("angular-modal-addPlayers", function($scope, GameData, $rootScope) {
    $scope.addPlayer = function(){
        var newPlayerName = $('#modalAddPlayers input').val();
        if(validatePlayerName(newPlayerName,$scope.players,$('#modalAddPlayers .alert'),$scope.language)){
            GameData.addPlayerToGame(newPlayerName);
            infoMessage($('#modalAddPlayers .alert'),
                newPlayerName + " " + eval("addPlayers."+$scope.language+".added"));
            $('#modalAddPlayers input').val('');
            $scope.applied = true;
            $('#modalAddPlayers input').blur(); // focusout event is triggered
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
            $('.loading-title').text(eval("loading."+$scope.language+".firstGame"));
            $('.loader-container').show();
            setTimeout(function(){
                $('.loader-container').hide();
                $rootScope.$broadcast('initializeGameBoard'); //generate 'initializeGameBoard' event
            }, loadingTime);  
		}
		else{
			warn($('#modalAddPlayers .alert'),eval("warnings.playerName."+$scope.language+".tooFew"));
		}
    };
    $scope.btnRemovePlayer = function(index){
        $scope.players.splice(index,1);
        $scope.placeholder = eval("addPlayers."+$scope.language+".placeholder")+" "+($scope.players.length + 1);
        GameData.resetPlayerIndexes();
    };

    //events
    $scope.$on('initializeAddPlayers', function (event) {
        $scope.players = GameData.getPlayers();
        $scope.language = GameData.getLanguage();
        setTextModalAddPlayer($scope.language);
        $scope.placeholder = eval("addPlayers."+$scope.language+".placeholder")+" "+($scope.players.length + 1);
        // focus events are used for positioning placeholder
        $('#modalAddPlayers input').focus(function(){
            $(this).css('lineHeight','1.33');
            $scope.placeholder = "";
            $scope.$apply();
        });
        $('#modalAddPlayers input').focusout(function(){
            if($('#modalAddPlayers input').val() == ''){
                $('#modalAddPlayers input').css('lineHeight','46px');
            }
            else{
                $('#modalAddPlayers input').css('lineHeight','1.33');
            }
            $scope.placeholder = eval("addPlayers."+$scope.language+".placeholder")+" "+($scope.players.length + 1);
            if(!$scope.applied){
                $scope.$apply();
            }
            $scope.applied = false;
        });
        initializeAddPlayersModal();   
    });
});