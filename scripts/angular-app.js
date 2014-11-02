var app = angular.module("angular-app", []); 

app.factory('GameData', function(){
	var players = new Array();
	var data = {
		throwNumber:1,
		confirmType:'' // for making player confirm new game & restart game choice
	}
	return{
		emptyPlayersArray: function(){
			players = new Array();
		},
		setConfirmType: function(type){
			confirmType = type;
		},
		getConfirmType: function(type){
			return confirmType;
		},
		resetConfirmType: function(){
			confirmType = '';
		},
		resetPlayers: function(){
			var newIndex = 0;
			$.each(players,function(){
				this.index = newIndex;
				newIndex++;
				this.outOfTheGame = false;
				this.winner = false;
				this.score = 0;
				this.scoreHistory = new Array();
				this.misses = 0; /*3 misses in a row means disqualification*/
				this.myTurn = false;
				this.disqualified = false;
			});
		},
		resetPlayerIndexes: function(){
			var newIndex = 0;
			$.each(players,function(){
				this.index = newIndex;
				newIndex++;
			});
		},
		getPlayers: function(){
			return players;
		},
		getData: function(){
			return data;
		},
		resetThrowNumber: function(){
			data.throwNumber = 1;
		},
		getActivePlayer: function(){
			var activePlayer;
			$.each(players,function(){
				if(this.myTurn){
					activePlayer = this;
					return false;
				}
			});
			return activePlayer;
		},
		getNextInGamePlayer: function(activePlayerIndex){ // infinite loop when !this.stillPlayersInTheGame()
			var nextPlayer;
			if(activePlayerIndex == (players.length-1)){
				nextPlayer = players[0];
			}
			else{
				nextPlayer = players[activePlayerIndex + 1];
			}
			if(!nextPlayer.outOfTheGame){
				return nextPlayer;
			}
			else{
				return this.getNextInGamePlayer(nextPlayer.index);
			}
		},
		getFirstInGamePlayer: function(){ // infinite loop when !this.stillPlayersInTheGame()
			var firstInGamePlayer;
			for(var i = 0; i < players.length; i++){
				if(!players[i].outOfTheGame){
					firstInGamePlayer = players[i];
					break;
				}
			}
			return firstInGamePlayer;
		},
		undoLastThrow: function(){ 
            var indexActivePlayer = this.getActivePlayer().index;
            var previousPlayer = this.getPreviousPlayer(indexActivePlayer);
            while(previousPlayer.scoreHistory.length <= (data.throwNumber-1)){
            	if(indexActivePlayer <= previousPlayer.index && previousPlayer.scoreHistory.length == (data.throwNumber-1)){
            		data.throwNumber--
            		break; //previous player is in previous throw round
            	}
            	else{
            		previousPlayer = this.getPreviousPlayer(previousPlayer.index);
            	}
            }
            previousPlayer.scoreHistory.pop();
            if(previousPlayer.scoreHistory.length == 0){ // back on first throw
            	previousPlayer.score = 0;
            }
            else{
            	previousPlayer.score = previousPlayer.scoreHistory[previousPlayer.scoreHistory.length - 1];
            }
            //reset misses
            if(previousPlayer.score == previousPlayer.scoreHistory[previousPlayer.scoreHistory.length - 2]){
                previousPlayer.misses = 1;
                if(previousPlayer.score == previousPlayer.scoreHistory[previousPlayer.scoreHistory.length - 3]){
                    previousPlayer.misses = 2;
                }
            }
            else{
                previousPlayer.misses = 0;
            }
            this.getActivePlayer().myTurn = false;
            previousPlayer.myTurn = true;
            previousPlayer.outOfTheGame = false;
            previousPlayer.winner = false;
            previousPlayer.ranking = 999;
            previousPlayer.disqualified = false;
        }, 
		getPreviousPlayer: function(playerIndex){ 
			var previousPlayer;
			if(playerIndex == 0){
				previousPlayer = players[players.length-1];
			}
			else{
				previousPlayer = players[playerIndex - 1];
			}
			return previousPlayer;
		},
		setRanking: function(player){ // infinite loop when !this.stillPlayersInTheGame()
			if(!this.gameHasWinner()){
				player.winner = true;
				player.ranking = 1;
			}
			else{
				player.ranking = this.getLowestRanking() + 1;
			}
		},
		getLowestRanking: function(){
			var lowestRanking = -1;
			$.each(players,function(){
				if(this.ranking !== 999 && this.ranking > lowestRanking){
					lowestRanking = this.ranking;
				}
			});
			if(lowestRanking == -1){ // no winner yet -> this if should never be true
				lowestRanking = 999;
			}
			return lowestRanking;
		},
		stillPlayersInTheGame: function(){
			var stillPlayersInTheGame = false;
			$.each(players,function(){
				if(!this.outOfTheGame){
					stillPlayersInTheGame = true;
					return false;
				}
			});
			return stillPlayersInTheGame;
		},
		gameHasWinner: function(){
			var gameHasWinner = false;
			$.each(players,function(){
				if(this.winner){
					gameHasWinner = true;
					return false;
				}
			});
			return gameHasWinner;
		},
		gameHasStarted: function(){
			return players[0].scoreHistory.length > 0;
		},
		addPlayerToGame: function(newPlayerName){
			players.push(new Player(players.length, newPlayerName));
		}
	};
});

app.filter('rangeZeroToFour', function () {
  return function (items) {
  	var length = items.length < 4 ? items.length : 4;
    var filtered = [];
    for (var i = 0; i < length; i++) {
        filtered.push(items[i]);
    }
    return filtered;
  };
});

app.filter('rangeFiveToEight', function () {
  return function (items) {
    var filtered = [];
    for (var i = 4; i < items.length; i++) {
        filtered.push(items[i]);
    }
    return filtered;
  };
});