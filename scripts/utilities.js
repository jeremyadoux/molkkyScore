/*globals*/
var loadingTime = 2000;

var warnings = {
	playerName:{
		empty:"Please provide a valid player name",
		unique:"Player name already in use",
		tooFew:"At least 2 player names are required"
	}
};

var loading = {
	firstGame:"starting game",
	startApp:"starting application",
	newGame:"starting new game",
	restartGame:"restarting game",	
};

function validatePlayerName(newPlayerName,players,alertElement){
	if($.trim(newPlayerName) == ""){
		warn(alertElement, warnings.playerName.empty);
		return false;
	}
	var isValid = true;
	$.each(players,function(){
		if(this.name.toLowerCase().trim() == newPlayerName.toLowerCase().trim()){
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
};

//Constructor
function Player(index, name){
	this.index = index; //starts at 0
	this.name = name;
	this.outOfTheGame = false;
	this.winner = false;
	this.ranking = 999; // winner has ranking 1, second to reach score 50 has ranking 2, etc...
	this.wins = 0;
	this.score = 0;
	this.scoreHistory = [];
	this.misses = 0; // 3 misses in a row means disqualification
	this.myTurn = false;
	this.disqualified = false;
	this.processScore = processScore;
	this.processMiss = processMiss;
	/* begin: bosklapper stuff */
	this.processScoreBosklappers = processScoreBosklappers;
	this.processMissBosklappers = processMissBosklappers;
	/* end: bosklapper stuff */
}

//player methods
function processScore(number){
	this.misses = 0;
	if((this.score + number) < 50){
		this.score += number;
	}
	else if((this.score + number) > 50){
		this.score = 25;
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
	}
	this.scoreHistory.push(this.score);
}

//sort utilities
function comparePlayerScores(playerOne,playerTwo){
	var scoreOne = playerOne.disqualified ? playerOne.scoreHistory[playerOne.scoreHistory.length-2] : playerOne.score;
	var scoreTwo = playerTwo.disqualified ? playerTwo.scoreHistory[playerTwo.scoreHistory.length-2] : playerTwo.score;
	if(scoreOne > scoreTwo){
		return -1;
	}
	else if(scoreOne === scoreTwo){
		if(scoreOne !== 50){
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
	$('#mainTable #td-player-name').removeClass("active");
	$('#mainTable .td-score-number.active').removeClass("active");
	$('#mainTable #td-0.billyHalf').removeClass("billyHalf");
	$('#mainTable #td-0.billySuper').removeClass("billySuper");
	$('#mainTable #td-0').text('0');
	$('#mainTable').fadeIn(1000, function(){
		if(numberOfPlayers <= 4){
			$('#mainTable #scoreTable td').css({width:100/numberOfPlayers+"%"});
		}
		else{
			$('#mainTable #scoreTable td').css({width:100/Math.ceil(numberOfPlayers/2)+"%"});
		}		
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

function initializeScoreboardModalContinuableGame(numberOfPlayers){
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

function showModal(modal){
	$(modal).modal({
			keyboard: false, // prevent modal from closing with ESC key 
			backdrop: 'static'}, // prevent modal from closing with outside click 
		'show');
}

function showModalWithLoader(modal, loaderMessage){
	$('loading-title').text(loaderMessage);
	$('.loader-container').show();
	setTimeout(function(){
		$('.loader-container').hide();
		showModal(modal);
	},loadingTime);	
}

/* begin: bosklapper stuff */
var bosklappersActivationCount = 0;

function checkBosklappersActivationCount(reset){
	if(reset){
		bosklappersActivationCount = 0;
	} 
	else{
		bosklappersActivationCount++;
	}
	if(bosklappersActivationCount < 3){
		return false;
	}
	else{
		return true;
	}
}

function setBillyChar(){
	if($('#td-0').text() == '0'){
		if($('#td-0').hasClass('active')){
			$('#td-0').text('/2');
			$('#td-0').removeClass('active').addClass('billyHalf');
		}
		else{
			toggleNumberActivation(0);
		}
	}
	else if ($('#td-0').text() == '/2'){
		$('#td-0').text('0!');
		$('#td-0').removeClass('billyHalf').addClass('billySuper');
		$('#mainTable .td-score-number.active').removeClass("active"); // can't choose number with superBilly
	} 
	else{
		$('#td-0').text('0');
		$('#td-0').removeClass('billySuper');
		$('#td-player-name').removeClass('active');
	}
}

function toggleNumberActivationBosklappers(number){
	if ($('#td-0').text() == '0!') return; // can't choose number with superBilly

	var idSelector = '#td-'+ number;
    if($(idSelector).hasClass("active")){
		$(idSelector).removeClass("active");
		if($('#td-0').text() != '/2'){
			$('#mainTable #td-player-name').removeClass("active");
		}
	}
	else{
		$('#mainTable .td-score-number.active').removeClass("active");
		$(idSelector).addClass("active");
		if(!$('#mainTable #td-player-name').hasClass("active")){
			$('#mainTable #td-player-name').addClass("active");
		}		
	}
}

function processScoreBosklappers(number){
	this.misses = 0;
	if($('#td-0').hasClass('billyHalf')){
		if (number == -1){ // only billy was hit
			this.score = Math.floor(this.score/2);
		}
		else{ // billy and number was hit
			this.score = Math.floor((this.score + number)/2);
		}
	}
	else if($('#td-0').hasClass('billySuper')){
		this.score = 0;
	}
	else{
		if((this.score + number) < 50){
			this.score += number;
		}
		else if((this.score + number) > 50){
			this.score = Math.floor((this.score + number)/2);
		}
		else{ //player has score 50
			this.score = 50;
			this.outOfTheGame = true;
		}
	}
	this.scoreHistory.push(this.score);	
}

function processMissBosklappers(){
	this.misses++;
	if(this.misses > 2){
		this.score = Math.floor(this.score/2);
		this.misses = 0;
	}
	this.scoreHistory.push(this.score);
}
/* end: bosklapper stuff */