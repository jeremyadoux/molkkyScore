/*globals*/
var players = new Array();

var warnings = {
	playerName:{
		empty:"Please provide a valid player name",
		unique:"Player name already in use",
		tooFew:"At least 2 player names are required"
	}
};

var lightColor = '#FFFFFF';
var alertColor = '#D82A25';
var darkColor = '#020000';
var accentColor = '#2DBDE1';

function warn(alertElement,warning){
	alertElement.text(warning);
	alertElement.show();
}

function initializeMainTable(){
	players[0].myTurn = true;
	$('#mainTable').fadeIn(1000,function(){
		$('#score-table-item-0').addClass("active");
	});
}

function addScore(number){
	this.score += number;
	$("#score-table-item-"+this.index).text(this.score);
	if(this.score >= 50){
		players.splice(this.index,1);
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