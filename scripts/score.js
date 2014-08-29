$(document).ready(function() {
	$('#mainTable .td-score-number').click(function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$('#mainTable #td-player-name').removeClass("active");
		}
		else{
			$('#mainTable .td-score-number.active').removeClass("active");
			$(this).addClass("active");
			$('#mainTable #td-player-name').addClass("active");
		}
	});

	$('#mainTable #td-player-name').click(function(){
		if($(this).hasClass("active")){
			var activePlayer = getActivePlayer();
			activePlayer.addScore(parseInt($('#mainTable .td-score-number.active').text()));
			
			if(activePlayer.score > 10){
				activePlayer.outOfTheGame = true;
				alert(activePlayer.name+" is out");
			} 
			$('#mainTable .td-score-number.active').removeClass("active");
			$('#mainTable .score-table-item.active').removeClass("active");
			activePlayer.myTurn = false;
			if(stillPlayersInTheGame()){
				$('#mainTable #score-table-item-'+activePlayer.getNextPlayer().index).addClass("active");						
				activePlayer.getNextPlayer().myTurn = true;
			}
			else{
				alert("all players out");
			}
			$('#mainTable #td-player-name').removeClass("active");
		}
	});
});