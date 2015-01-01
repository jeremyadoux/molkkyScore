//globals
var start = {
	En:{
		quickGame:"Start Game",
		tutorial:"Tutorial",
		about:"About"
	},
	Fr:{
		quickGame:"Démarrer le jeu",
		tutorial:"Aidez-Moi",
		about:"À propos"
	}
}

var addPlayers = {
	En:{
		title:"Enter player names..",
		placeholder:"Player",
		added:"added to game",
		max:"Max. players reached"
	},
	Fr:{
		title:"Entrez les noms des joueurs..",
		placeholder:"Joueur",
		added:"ajouté au jeu",
		max:"Max. de joueurs est atteint"
	}
}

var buttons = {
	En:{
		ready:"Ready",
		yes:"Yes",
		no:"No"
	},
	Fr:{
		ready:"Prêt",
		yes:"Oui",
		no:"Non"
	}
}

var warnings = {
	playerName:{
		En:{
			empty:"Please provide a valid player name",
			unique:"Player name already in use",
			tooFew:"At least 2 player names are required"
		},
		Fr:{
			empty:"Remplissez un nom valide",
			unique:"Nom du joueur est déjà utilisée",
			tooFew:"Au moins 2 noms de joueurs sont obligatoires"
		}
	}
};

var loading = {
	En:{
		firstGame:"starting game",
		startApp:"loading application",
		newGame:"starting new game",
		restartGame:"restarting game",	
		restoreGame:"restoring game",
		tutorial:"loading tutorial"
	},
	Fr:{
		firstGame:"jeu en cours de démarrage",
		startApp:"l'application se charge",
		newGame:"nouveau jeu en cours de démarrage",
		restartGame:"jeu en cours de redémarrage",	
		restoreGame:"jeu en cours de restaurage",
		tutorial:"manuel d'instruction se charge"
	}
};

var confirm = {
	En:{
		restart:"Restart game",
		exit:"Exit game",
		body:"Are you sure?"
	},
	Fr:{
		restart:"Redémarrez le jeu",
		exit:"Quittez le jeu",
		body:"Êtes-vous sûr?"
	}
}

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

// functions
function setTextModalStart(language){
	$('#btn-quickGame-start span').fadeOut("fast",function(){
		$('#btn-quickGame-start span').text(eval("start."+language+".quickGame"));
	}).fadeIn("fast");
	$('#btn-tutorial-start span').fadeOut("fast",function(){
		$('#btn-tutorial-start span').text(eval("start."+language+".tutorial"));
	}).fadeIn("fast");
	$('#btn-about-start span').fadeOut("fast",function(){
		$('#btn-about-start span').text(eval("start."+language+".about"));
	}).fadeIn("fast");
}

function setTextModalAddPlayer(language){
	$("#modalAddPlayers .modal-title").text(eval("addPlayers."+language+".title"));
	$("#modalAddPlayers .btn-ready").text(eval("buttons."+language+".ready"));
	$("#modalAddPlayers .max-message").text(eval("addPlayers."+language+".max"));
}

function setTextModalConfirm(confirmType, language){
	//title
	var titleText = '';
	if(confirmType == 'Restart'){
		titleText = eval("confirm."+language+".restart");
	}
	else if (confirmType == 'Exit'){
		titleText = eval("confirm."+language+".exit");
	}
	$('#modalConfirm .modal-header h2').text(titleText);
	//body
	$('#modalConfirm .modal-body').text(eval("confirm."+language+".body"));
	//buttons
	$('#modalConfirm #btn-no-confirm').text(eval("buttons."+language+".no"));
	$('#modalConfirm #btn-yes-confirm').text(eval("buttons."+language+".yes"));
}	