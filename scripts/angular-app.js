var app = angular.module("angular-app", []); 

app.factory('GameData', function(){
	var players = new Array();
	return{
		emptyPlayersArray: function(){
			players = new Array();
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
		undoLastThrow: function(){ // infinite loop when !this.stillPlayersInTheGame()
			var throwNumber = this.getActivePlayer().scoreHistory.length;
			var previousPlayer = this.getPreviousPlayer();
			while(previousPlayer.scoreHistory.length < throwNumber){
				previousPlayer = this.getPreviousPlayer();
			}
			previousPlayer.score = previousPlayer.scoreHistory[throwNumber - 1];
			previousPlayer.scoreHistory.pop();
			this.getActivePlayer().myTurn = false;
			previousPlayer.myTurn = true;
			previousPlayer.outOfTheGame = false;
			previousPlayer.winner = false;
			previousPlayer.ranking = 999; // winner has ranking 1, second to reach score 50 has ranking 2, etc...
			if(previousPlayer.misses > 0){
				previousPlayer.misses--;
			}
			previousPlayer.disqualified = false;
		},
		getPreviousPlayer: function(activePlayerIndex){ // infinite loop when !this.stillPlayersInTheGame()
			var previousPlayer;
			if(activePlayerIndex == 0){
				previousPlayer = players[players.length-1];
			}
			else{
				previousPlayer = players[activePlayerIndex - 1];
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
		addPlayerToGame: function(newPlayerName){
			players.push(new Player(players.length, newPlayerName));
		}
	};
});