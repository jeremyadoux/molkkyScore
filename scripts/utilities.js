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
	startApp:"loading application",
	newGame:"starting new game",
	restartGame:"restarting game",	
	restoreGame:"restoring game",
	tutorial:"loading tutorial"
};

var tutorial = {
	steps:{
		one: "It's Bob's turn and he has knocked over 6 pins. Select the number 6...",
		two: "Nice, now confirm Bob's score by touching his name. The scoreboard at the top will get updated...",
		three: "Well done! It's Sara's turn. She's didn't hit any pins! Select the number 0 and assign it to Sara.",
		four: "Bob is winning! You can get a detailed score overview by touching the scoreboard at the top. Give it a try...",
		five: "If you assign a wrong score, you can undo it by touching the settings icon at the top and selecting 'undo last'. Try it..",
		six: "Okey, you're all set for some mölkky action! Exit the tutorial game by touching the settings icon and selecting 'exit game'."
	},
	help:{
		one: "Nope! Select number 6",
		two: "Nope! Select Bob's name (marked red)",
		threeA: "Nope! Select number 0 and then select Sara's name",
		four: "Nope! Select the scoreboard at the top of the screen & then close it again",
		five: "Nope! Select the settings icon at the top right of the screen and then the 'Undo Last' button",
		six: "Nope! Select the settings icon at the top right of the screen and then the 'Exit game' button"
	}
};

function getTutorialHelpText(step){
	switch(step){
		case 1: return tutorial.help.one;
				break;
		case 2: return tutorial.help.two;
				break;
		case 3: return tutorial.help.threeA;
				break;
		case 4: return tutorial.help.four;
				break;
		case 5: return tutorial.help.five;
				break;
		case 6: return tutorial.help.six;
				break;
	}
}

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

function infoMessage(infoElement,message){
	infoElement.text(message);
	infoElement.removeClass("alert-info").addClass("alert-info");
	infoElement.fadeIn("slow").fadeOut("slow", function(){
		infoElement.removeClass("alert-info");
	});
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
}

function getTutorialPlayers(){
	var playerOne= new Player(0, "player A");
	var playerTwo= new Player(1, "player B");
	return [playerOne, playerTwo];
}

//player methods
function processScore(player, number){
	player.misses = 0;
	if((player.score + number) < 50){
		player.score += number;
	}
	else if((player.score + number) > 50){
		player.score = 25;
	}
	else{ //player has score 50
		player.score = 50;
		player.outOfTheGame = true;
	}
	player.scoreHistory.push(player.score);
}

function processMiss(player){
	player.misses++;
	if(player.misses > 2){
		player.disqualified = true;
		player.outOfTheGame = true;
		player.score = 'X';
	}
	player.scoreHistory.push(player.score);
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
function initializeMainTable(numberOfPlayers, tutorial){
	$('#mainTable #td-player-name').removeClass("active");
	$('#mainTable .td-score-number.active').removeClass("active");
	$('#mainTable #td-0.billyHalf').removeClass("billyHalf");
	$('#mainTable #td-0.billySuper').removeClass("billySuper");
	$('#mainTable #td-0').text('0');
	$('#mainTable').fadeIn(1000, function(){
		if(tutorial){
			setInitialColspanTutorial();
			setTutorialArrowsPosition(false);
		} 
		if(numberOfPlayers <= 4){
			$('#mainTable #scoreTable td').css({width:100/numberOfPlayers+"%"});
		}
		else{
			$('#mainTable #scoreTable td').css({width:100/Math.ceil(numberOfPlayers/2)+"%"});
		}		
	});
}

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

function animateOptionsIcon(){
	$("#td-options img").addClass("animate-spin");
	setTimeout(function(){
		$("#td-options img").removeClass("animate-spin");
	},2500);
}
						
function isRestoreGame(){
	if(window["localStorage"]){
		if(!localStorage.getItem("restoreGame")){ //on first-time usage of app
			localStorage.setItem("restoreGame",JSON.stringify(false));
			return false;
		}
		else{
			restoreGame = JSON.parse(localStorage.getItem("restoreGame"));
			return restoreGame;
		}
	}
	else{
		return false;
	}
}

function setIsRestoreGame(isRestoreGame){
	if(window["localStorage"]){
		localStorage.setItem("restoreGame",JSON.stringify(isRestoreGame));
		if(!isRestoreGame){
			localStorage.removeItem("players");
			localStorage.removeItem("data");
		}
	}
}

function writeGameDataToLocalStorage(players, data){
	if(window["localStorage"]){
		localStorage.setItem("players",JSON.stringify(players));
		localStorage.setItem("data",JSON.stringify(data));
		setIsRestoreGame(true);
	}
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

function processScoreBosklappers(player, number){
	player.misses = 0;
	if($('#td-0').hasClass('billyHalf')){
		if (number == -1){ // only billy was hit
			player.score = Math.floor(player.score/2);
		}
		else{ // billy and number was hit
			player.score = Math.floor((player.score + number)/2);
		}
	}
	else if($('#td-0').hasClass('billySuper')){
		player.score = 0;
	}
	else{
		if((player.score + number) < 50){
			player.score += number;
		}
		else if((player.score + number) > 50){
			player.score = Math.floor((player.score + number)/2);
		}
		else{ //player has score 50
			player.score = 50;
			player.outOfTheGame = true;
		}
	}
	player.scoreHistory.push(player.score);	
}

function processMissBosklappers(player){
	player.misses++;
	if(player.misses > 2){
		player.score = Math.floor(player.score/2);
		player.misses = 0;
	}
	player.scoreHistory.push(player.score);
}
/* end: bosklapper stuff */