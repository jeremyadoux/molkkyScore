$(document).ready(function() {

	$('#modalNewPlayers #btn-no-newPlayers').click(function(){
		$('#modalNewPlayers').modal('hide');
		startSamePlayersGame();
	});

	$('#modalNewPlayers #btn-yes-newPlayers').click(function(){
		$('#modalNewPlayers').modal('hide');
		startNewPlayersGame();
	});

});