
$(document).ready(function() {

	$('#modalStart').modal({
			keyboard: false, // prevent modal from closing with ESC key 
			backdrop: 'static'}, // prevent modal from closing with outside click 
		'show');

	$('#modalStart #btn-quickGame-start').click(function(){
		$('#modalStart').modal('hide');
		startNewPlayersGame();
	});
});

