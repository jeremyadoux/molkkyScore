/*globals*/
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

function validatePlayerName(newPlayerName,players,alertElement){
	if(newPlayerName == ""){
		warn(alertElement, warnings.playerName.empty);
		return false;
	}
	var isValid = true;
	$.each(players,function(){
		if(this.name.toLowerCase() == newPlayerName.toLowerCase()){
			warn(alertElement, warnings.playerName.unique);
			isValid = false;
			return false;
		}
	});
	if(isValid){
		alertElement.hide();
	}
	return isValid;
}

function warn(alertElement,warning){
	alertElement.text(warning);
	alertElement.show();
}

//Constructor
function Player(index, name){
	this.index = index; //starts at 0
	this.name = name;
	this.outOfTheGame = false;
	this.winner = false;
	this.ranking = 999; // winner has ranking 1, second to reach score 50 has ranking 2, etc...
	this.wins = 0;
	this.score = 0;
	this.scoreHistory = new Array();
	this.misses = 0; // 3 misses in a row means disqualification
	this.myTurn = false;
	this.disqualified = false;
	this.processScore = processScore;
	this.processMiss = processMiss;
}

//player methods
function processScore(number){
	this.scoreHistory.push(this.score);
	this.misses = 0;
	if((this.score + number) < 50){
		this.score += number;
	}
	else if((this.score + number) > 50){
		this.score = 25;
		alert(this.name + " larger than 50");
	}
	else{ //player has score 50
		this.score = 50;
		this.outOfTheGame = true;
	}
	
}

function processMiss(){
	this.scoreHistory.push(this.score);
	this.misses++;
	if(this.misses > 2){
		this.disqualified = true;
		this.outOfTheGame = true;
		this.score = 'X';
		alert(this.name + " disqualified");
	}
}

//sort utilities
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


// DOM manipulation
function initializeMainTable(numberOfPlayers){
	$('#mainTable #scoreTable td').css({width:100/numberOfPlayers+"%"});
	$('#mainTable').fadeIn(1000);
}

function initializeAddPlayersModal(){
	$('#modalAddPlayers .alert').hide();
	$('#modalAddPlayers input').attr('placeholder','Player 1');
	$('#modalAddPlayers').modal({
			keyboard: false, // prevent modal from closing with ESC key 
			backdrop: 'static'}, // prevent modal from closing with outside click 
		'show');
	$('#modalAddPlayers input').focus();
}

function initializeScoreboardModalEndedGame(){
	$('#modalScoreboard .modal-header .close').hide();
	$('#modalScoreboard .modal-footer .btn-primary').hide();
	$('#modalScoreboard .modal-footer .btn-default').removeClass('pull-left');
	$('#modalScoreboard').modal({
		keyboard: false, // prevent modal from closing with ESC key 
		backdrop: 'static'}, // prevent modal from closing with outside click 
	'show');
}

function initializeScoreboardModalContinuableGame(){
	$('#modalScoreboard .modal-header .close').show();
	$('#modalScoreboard .modal-footer .btn-primary').show();
	$('#modalScoreboard .modal-footer .btn-default').addClass('pull-left');
	$('#modalScoreboard').modal({
		keyboard: false, // prevent modal from closing with ESC key 
		backdrop: 'static'}, // prevent modal from closing with outside click 
	'show');
}

function toggleNumberActivation(number){
	var idSelector = '#td-'+ number;
    if($(idSelector).hasClass("active")){
		$(idSelector).removeClass("active");
		$('#mainTable #td-player-name').removeClass("active");
	}
	else{
		$('#mainTable .td-score-number.active').removeClass("active");
		$(idSelector).addClass("active");
		$('#mainTable #td-player-name').addClass("active");
	}
}
