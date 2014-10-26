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

//Prototype extensions
Array.prototype.contains = function (string) {
   for (var i = 0; i < this.length; i++) {
       if (this[i].toLowerCase() == string.toLowerCase()) return true;
   }
   return false;
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
	this.scoreHistory.push(this.score);
}

function processMiss(){
	this.misses++;
	if(this.misses > 2){
		this.disqualified = true;
		this.outOfTheGame = true;
		this.score = 'X';
		alert(this.name + " disqualified");
	}
	this.scoreHistory.push(this.score);
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
	$('#mainTable').fadeIn(1000, function(){
		$('#mainTable #scoreTable td').css({width:100/numberOfPlayers+"%"});
	});}

function initializeAddPlayersModal(){
	$('#modalAddPlayers .alert').hide();
	$('#modalAddPlayers').modal({
			keyboard: false, // prevent modal from closing with ESC key 
			backdrop: 'static'}, // prevent modal from closing with outside click 
		'show');
	$('#modalAddPlayers input').val('');
	$('#modalAddPlayers input').focus();
	if(window["localStorage"]){
		var playerNames = localStorage.getItem("playerNames");
		if(!playerNames){ //on first-time usage of app
			playerNames = [];
			localStorage.setItem("playerNames",JSON.stringify(playerNames));
		}
		else{
			playerNames = JSON.parse(playerNames);
		}
		$('input').typeahead().data('typeahead').source = playerNames; //initialize Bootstrap3-Typeahead plugin
	}
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
		$('addScoreBadge').text('');
	}
	else{
		$('#mainTable .td-score-number.active').removeClass("active");
		$(idSelector).addClass("active");
		$('#mainTable #td-player-name').addClass("active");
		$('#addScoreBadge').text('+' + number);
	}
}

function addNewPlayerNamesToLocalStorage(currentPlayers){
	if(window["localStorage"]){
		var playerNames = JSON.parse(localStorage.getItem("playerNames"));
		$.each(currentPlayers,function(){
			var currentName = this.name;
			if (!playerNames.contains(currentName)) { //case-insensitive
			   playerNames.push(this.name);
			}
		});
		localStorage.setItem("playerNames",JSON.stringify(playerNames));
	}
}