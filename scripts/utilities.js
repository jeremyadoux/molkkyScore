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

function Player(index, name){
	this.index = index;
	this.name = name;
	this.outOfTheGame = false;
	this.winner = false;
	this.ranking = 999; // winner has ranking 1, second to reach score 50 has ranking 2, etc...
	this.wins = 0;
	this.score = 0;
	this.misses = 0; // 3 misses in a row means disqualification
	this.myTurn = false;
	this.disqualified = false;
	this.processScore = processScore;
	this.processMiss = processMiss;
	this.getNextPlayer = getNextPlayer;
}

function resetPlayers(){
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
}

function warn(alertElement,warning){
	alertElement.text(warning);
	alertElement.show();
}

function initializeMainTable(){
	$('#mainTable #scoreTable .score-table-item').removeClass("active");
	$('#mainTable #scoreTable .score-table-item').text("0");
	players[0].myTurn = true;
	$('#mainTable #td-player-name').text(players[0].name + " »");
	$('#mainTable').fadeIn(1000,function(){
		$('#score-table-item-0').addClass("active");
	});
}

function comparePlayerScores(playerOne,playerTwo){
	if(playerOne.score > playerTwo.score){
		return -1;
	}
	else if(playerOne.score === playerTwo.score){
		if(playerOne.score !== 50){
			return 0;
		}
		else{
			return comparePlayerRankings(playerOne, playerTwo); // both players are out, so they have a ranking
		}
	}
	else{
		return 1;
	}
}

function comparePlayerRankings(playerOne,playerTwo){
	if(playerOne.ranking > playerTwo.ranking){
		return 1;
	}
	else if(playerOne.ranking === playerTwo.ranking){
		return 0;
	}
	else{
		return -1;
	}
}

function getLowestRanking(){
	var lowestRanking = -1;
	$.each(players,function(){
		if(this.ranking !== 999 && this.ranking > lowestRanking){
			lowestRanking = this.ranking;
		}
	});
	if(lowestRanking == -1){ // no winner yet
		lowestRanking = 999;
	}
	return lowestRanking;
}

function startSamePlayersGame(){
	players.sort(comparePlayerScores);
	resetPlayers();
	$('#mainTable').fadeOut(1000,function(){
		initializeMainTable();
	});
}

function startNewPlayersGame(){
	$('#mainTable').fadeOut(1000, function(){
		$('#mainTable #scoreTable').empty();
	});
	players = new Array(); //global
	$('#modalAddPlayers .list-group').empty();
	$('#modalAddPlayers .alert').hide();
	$('#modalAddPlayers input').attr('placeholder','Player 1');
	$('#modalAddPlayers').modal({
			keyboard: false, // prevent modal from closing with ESC key 
			backdrop: 'static'}, // prevent modal from closing with outside click 
		'show');
	$('#modalAddPlayers input').focus();
}


