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
				this.misses = 0; /*3 misses in a row means disqualification*/
				this.myTurn = false;
				this.disqualified = false;
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
		getNextPlayer: function(activePlayerIndex){ // infinite loop when !this.stillPlayersInTheGame()
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
				return this.getNextPlayer(nextPlayer.index);
			}
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