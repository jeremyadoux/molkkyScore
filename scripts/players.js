function Player(name){
	this.name = name;
	this.wins = 0;
	this.score = 0;
	this.addScore = function(score){
		this.score += score;
	}
}

var countPlayers = 0;
var players = new Array();

function addPlayer(newPlayerName){
	addPlayerToGame(newPlayerName);
	addPlayerToModal(newPlayerName);
	addPlayerToScoreTable(newPlayerName);
}

function addPlayerToGame(newPlayerName){
	players[countPlayers] = new Player(newPlayerName);
	countPlayers+=1;
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
	$('#mainTable #scoreTable').append("<td id='score-table-item-"+ (countPlayers-1) +"'>0</td>");
	$('#mainTable #scoreTable td').css({width:100/countPlayers+"%"});
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