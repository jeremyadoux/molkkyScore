$(document).ready(function() {

	$('#modalScoreboard #btn-exit-scoreboard').click(function(){
		$('#modalScoreboard').modal('hide');
		$('#modalStart').modal('show');
	});

	$('#modalScoreboard #btn-newGame-scoreboard').click(function(){
		$('#modalScoreboard').modal('hide');
		$('#modalNewPlayers').modal('show');
	});

});

function initializeScoreboardModal(){
	$('#modalScoreboard .list-group').empty();
	$.each(players,function(){
		$('#modalScoreboard .list-group').append("<li class='list-group-item'>"
											+ this.name
											+"<span class='pull-right'>"
											+ this.score
											+"</span>"
											+"</li>");
		if(this.winner){
			$('#modalScoreboard .list-group li:last-child span').before(" - winner");
		}		
	});
	if(!stillPlayersInTheGame()){
		$('#modalScoreboard .modal-header .close').hide();
		$('#modalScoreboard .modal-footer .btn-primary').hide();
		$('#modalScoreboard .modal-footer .btn-default').removeClass('pull-left');
		$('#modalScoreboard').modal({
			keyboard: false, // prevent modal from closing with ESC key 
			backdrop: 'static'}, // prevent modal from closing with outside click 
		'show');
	}
	else{
		$('#modalScoreboard .modal-header .close').show();
		$('#modalScoreboard .modal-footer .btn-primary').show();
		$('#modalScoreboard .modal-footer .btn-default').addClass('pull-left');
		$('#modalScoreboard').modal({
			keyboard: false, // prevent modal from closing with ESC key 
			backdrop: 'static'}, // prevent modal from closing with outside click 
		'show');
	}
	
}