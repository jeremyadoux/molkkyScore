$(document).ready(function() {
	$('#modalAddPlayers').modal({
			keyboard: false, // prevent modal from closing with ESC key 
			backdrop: 'static'}, // prevent modal from closing with outside click 
		'show');
	$('#modalAddPlayers input').focus();

	$('#modalAddPlayers .input-group-addon').click(function(){
		var newPlayerName = $('#modalAddPlayers input').val();
		if(validatePlayerName(newPlayerName,$('#modalAddPlayers .alert'))){
			addPlayer(newPlayerName);
			$('#modalAddPlayers input').val('');
			$('#modalAddPlayers input').attr('placeholder','Player '+ (players.length + 1));
			$('#modalAddPlayers input').focus();
		}
		/**
		$('#modalAddPlayers .alert').text($('#modalAddPlayers input').val() +' is not a valid name');
		$('#modalAddPlayers .alert').show();
		*/
	});
	$('#modalAddPlayers .btn-default').click(function(){		
		if(players.length > 1){
			$('#modalAddPlayers').modal('hide');
			initializeMainTable();
		}
		else{
			warn($('#modalAddPlayers .alert'),warnings.playerName.tooFew);
		}
	});
});

function Player(index, name){
	this.index = index;
	this.name = name;
	this.outOfTheGame = false;
	this.wins = 0;
	this.score = 0;
	this.misses = 0; /*3 misses in a row means disqualification*/
	this.myTurn = false;
	this.disqualified = false;
	this.processScore = processScore;
	this.processMiss = processMiss;
	this.getNextPlayer = getNextPlayer;
}

function addPlayer(newPlayerName){
	addPlayerToGame(newPlayerName);
	addPlayerToModal(newPlayerName);
	addPlayerToScoreTable(newPlayerName);
}

function addPlayerToGame(newPlayerName){
	players[players.length] = new Player(players.length, newPlayerName);
}

function addPlayerToModal(newPlayerName){
	$('#modalAddPlayers .list-group').append("<li class='list-group-item'>"+newPlayerName
											+"<button type='button' class='close'>"
												+"<span aria-hidden='true'>&times;</span>"
												+"<span class='sr-only'>Close</span>"
											+"</button>"
											+"</li>");
}

function addPlayerToScoreTable(newPlayerName){
	$('#mainTable #scoreTable').append("<td id='score-table-item-"+ (players.length-1) 
										+"' class='score-table-item'>0</td>");
	$('#mainTable #scoreTable td').css({width:100/players.length+"%"});
}

function validatePlayerName(newPlayerName,alertElement){
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

