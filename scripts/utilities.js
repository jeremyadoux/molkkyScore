/*globals*/
var loadingTime = 2000;
var hasNetwork = hasNetwork();

function validatePlayerName(newPlayerName,players,alertElement, language){
	if($.trim(newPlayerName) == ""){
		warn(alertElement, eval("warnings.playerName."+language+".empty"));
		return false;
	}
	var isValid = true;
	$.each(players,function(){
		if(this.name.toLowerCase().trim() == newPlayerName.toLowerCase().trim()){
			warn(alertElement, eval("warnings.playerName."+language+".unique"));
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

function getTutorialPlayers(language){
	var playerOne = {};
	var playerTwo = {};
	if(language == "En"){
		playerOne= new Player(0, "Bob");
		playerTwo= new Player(1, "Sara");
	}
	else if(language == "Fr"){
		playerOne= new Player(0, "Hugo");
		playerTwo= new Player(1, "Emma");
	}
	return [playerOne, playerTwo];
}

//player methods
function processScore(player, number, maxScore, exceedMaxSetting){
	player.misses = 0;
	if((player.score + number) < maxScore){
		player.score += number;
	}
	else if((player.score + number) > maxScore){
		if(exceedMaxSetting == 'Zero'){
			player.score = 0;
		}
		else if(exceedMaxSetting == 'HalfMax'){
			player.score = Math.floor(maxScore/2);
		}
		else{ // Half
			player.score = Math.floor((player.score + number)/2);
		} 	
	}
	else{ //player has score maxScore
		player.score = maxScore;
		player.outOfTheGame = true;
	}
	player.scoreHistory.push(player.score);
}

function processMiss(player, missesSetting){
	player.misses++;
	if(player.misses > 2){
		if(missesSetting == 'Disqualified'){
			player.disqualified = true;
			player.outOfTheGame = true;
			player.score = 'X';	
		}
		else if(missesSetting == 'Half'){
			player.score = Math.floor(player.score/2);	
		}
		else{ // Zero
			player.score = 0;
		}
		
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

/* http://www.kirupa.com/html5/check_if_internet_connection_exists_in_javascript.htm */
function hasNetwork() {
    var xhr = new XMLHttpRequest();
    var file = "http://molkkyscore.com/index.html";
    var randomNum = Math.round(Math.random() * 10000);

    xhr.open('HEAD', file + "?rand=" + randomNum, false);
     
    try {
        xhr.send();
         
        if (xhr.status >= 200 && xhr.status < 304) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
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
		$('#modalAddPlayers input').typeahead().data('typeahead').source = playerNames; //initialize Bootstrap3-Typeahead plugin
	}
}

function initializeSettingsGameModal(settings){
	$('#modalSettingsGame').modal({
		keyboard: false, // prevent modal from closing with ESC key 
		backdrop: 'static'}, // prevent modal from closing with outside click 
	'show');
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

function processScoreBosklappers(player, number, maxScore){
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
		if((player.score + number) < maxScore){
			player.score += number;
		}
		else if((player.score + number) > maxScore){
			player.score = Math.floor((player.score + number)/2);
		}
		else{ //player has score maxScore
			player.score = maxScore;
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