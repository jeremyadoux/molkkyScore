$(document).ready(function() {
	$('#mainTable .td-score-number').click(function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$('#mainTable #td-player-name').removeClass("active");
		}
		else{
			$('#mainTable .td-score-number.active').removeClass("active");
			$(this).addClass("active");
			$('#mainTable #td-player-name').addClass("active");
		}
	});

	$('#mainTable #td-player-name').click(function(){
		if($(this).hasClass("active")){
			var activePlayer = getActivePlayer();
			var scoreNumber = parseInt($('#mainTable .td-score-number.active').text());
			if(scoreNumber == 0){
				activePlayer.processMiss();
			}
			else{
				activePlayer.processScore(scoreNumber);
			}
			
			$('#mainTable .td-score-number.active').removeClass("active");
			$('#mainTable .score-table-item.active').removeClass("active");
			activePlayer.myTurn = false;
			if(stillPlayersInTheGame()){
				$('#mainTable #score-table-item-'+activePlayer.getNextPlayer().index).addClass("active");						
				activePlayer.getNextPlayer().myTurn = true;
				$('#mainTable #td-player-name').text(activePlayer.getNextPlayer().name + " »");
			}
			else{
				initializeScoreboardModal();
			}
			$('#mainTable #td-player-name').removeClass("active");
		}
	});
});

function processScore(number){
	this.misses = 0;
	$("#score-table-item-"+this.index+" p.misses").remove();
	this.score += number;
	if(this.score > 50){
		this.score = 25;
		alert(this.name + " larger than 50");
	}
	else if(this.score == 50){
		this.outOfTheGame = true;
		if(!gameHasWinner()){
			this.winner = true;
			this.ranking = 1;
			initializeScoreboardModal();
		}
		else{
			this.ranking = getLowestRanking() + 1;
		}
	}
	$("#score-table-item-"+this.index).text(this.score);	
}

function processMiss(){
	this.misses++;
	if(this.misses == 1){
		$("#score-table-item-"+this.index).append("<p class='misses'>x</p>");		
	}
	else if(this.misses == 2){
		$("#score-table-item-"+this.index + " p.misses").text("xx");
	}
	else{
		this.disqualified = true;
		this.outOfTheGame = true;
		this.score = 0;
		$("#score-table-item-"+this.index+" p.misses").remove();
		$("#score-table-item-"+this.index).addClass("disqualified");
		$("#score-table-item-"+this.index).text("X");
		alert(this.name + " disqualified");
	}
}

function getNextPlayer(){ /*infinite loop when all players out of the game!*/
	var nextPlayer;
	if(this.index == (players.length-1)){
		nextPlayer = players[0];
	}
	else{
		nextPlayer = players[this.index + 1];
	}
	if(!nextPlayer.outOfTheGame){
		return nextPlayer;
	}
	else{
		return nextPlayer.getNextPlayer();
	}
}

function getActivePlayer(){
	var activePlayer;
	$.each(players,function(){
		if(this.myTurn){
			activePlayer = this;
			return false;
		}
	});
	return activePlayer;
} 

function stillPlayersInTheGame(){
	var stillPlayersInTheGame = false;
	$.each(players,function(){
		if(!this.outOfTheGame){
			stillPlayersInTheGame = true;
			return false;
		}
	});
	return stillPlayersInTheGame;
}

function gameHasWinner(){
	var gameHasWinner = false;
	$.each(players,function(){
		if(this.winner){
			gameHasWinner = true;
			return false;
		}
	});
	return gameHasWinner;
}