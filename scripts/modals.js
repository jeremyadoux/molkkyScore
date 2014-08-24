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
			$('#modalAddPlayers input').attr('placeholder','Player '+ (countPlayers+1));

		}
		/**
		$('#modalAddPlayers .alert').text($('#modalAddPlayers input').val() +' is not a valid name');
		$('#modalAddPlayers .alert').show();
		*/
	});
	$('#modalAddPlayers .btn-default').click(function(){		
		if(countPlayers > 1){
			$('#modalAddPlayers').modal('hide');
			initializeMainTable();
		}
		else{
			warn($('#modalAddPlayers .alert'),warnings.playerName.tooFew);
		}
	});
});

