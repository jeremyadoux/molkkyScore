//globals
var start = {
	En:{
		quickGame:"Start Game",
		tutorial:"Tutorial",
		about:"About",
		share:"share"
	},
	Fr:{
		quickGame:"Démarrer le jeu",
		tutorial:"Aidez-Moi",
		about:"À propos",
		share:"partager"
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
		no:"No",
		cancel:"Cancel",
		restart: "Restart game",
		newGame: "New game",
		undo: "Undo last",
		exit: "Exit game",
		continueGame: "Continue"
	},
	Fr:{
		ready:"Prêt",
		yes:"Oui",
		no:"Non",
		cancel:"Annuler",
		restart: "Redémarrer",
		newGame: "Nouveau jeu",
		undo: "Annuler dernière",
		exit: "Quitter",
		continueGame: "Continuer"
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
			unique:"Nom du joueur est déjà utilisé",
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
		firstGame:"démarrage du jeu",
		startApp:"l'application se charge",
		newGame:"nouveau jeu",
		restartGame:"redémarrer le jeu",	
		restoreGame:"en cours de restaurage",
		tutorial:"manuel d'instruction se charge"
	}
};

var newPlayers = {
	En:{
		title: "New game",
		body: "Same players?"
	},
	Fr:{
		title: "Nouveau jeu",
		body: "Voulez-vous garder les mêmes joueurs?"
	}
}

var confirm = {
	En:{
		restart:"Restart game",
		exit:"Exit game",
		body:"Are you sure?"
	},
	Fr:{
		restart:"Redémarrer",
		exit:"Quitter le jeu",
		body:"Êtes-vous sûr?"
	}
}

var scoreboard = {
	En:{
		scoreboard: "Scoreboard",
		details: "Details",
		buttonNew: "New game",
		buttonExit: "Exit"
	},
	Fr:{
		scoreboard: "Feuille de scorage",
		details: "Détails",
		buttonNew: "Nouveau",
		buttonExit: "Quitter"
	}
}

var tutorial = {
	En:{
		title:"Tutorial",
		intro:"<p>For the tutorial we've started a game with two players, named Bob & Sara.</p><p>You can <strong>navigate</strong> through the tutorial either by following the instructions or by use of the arrows on the bottom of the screen.</p><p>You can <strong>exit</strong> the tutorial anytime by selecting the options icon at the top right of the screen.</p>",
		introButton:"Start tutorial",
		steps:{
			one: "It's Bob's turn and he has knocked over 6 pins. Select the number 6...",
			two: "Nice, now confirm Bob's score by touching his name. The scoreboard at the top will get updated...",
			three: "Well done! It's Sara's turn. She's didn't hit any pins! Select the number 0 and assign it to Sara.",
			four: "Bob is winning! You can get a detailed score overview by touching the scoreboard at the top. Give it a try...",
			five: "If you assign a wrong score, you can undo it by touching the options icon at the top and selecting 'undo last'. Try it..",
			six: "Okey, you're all set for some mölkky action! Exit the tutorial game by touching the options icon and selecting 'exit game'."
		},
		help:{
			one: "Nope! Select number 6",
			two: "Nope! Select Bob's name (marked red)",
			three: "Nope! Select number 0 and then select Sara's name",
			four: "Nope! Select the scoreboard at the top of the screen & then close it again",
			five: "Nope! Select the options icon at the top right of the screen and then the 'Undo Last' button",
			six: "Nope! Select the options icon at the top right of the screen and then the 'Exit game' button"
		}
	},
	Fr:{
		title:"Aidez-Moi",
		intro:"<p>Pour ce tutoriel, nous avons créé un jeu de deux joueurs, nommé Hugo & Emma.</p><p>Vous pouvez <strong>naviguer</strong> dans le tutoriel soit en suivant les instructions ou par l'utilisation des flèches sur le fond de l'écran.</p><p>Vous pouvez <strong>quitter</strong> le tutoriel tout moment en sélectionnant l'icône des options en haut à droite de l'écran.</p>",
		introButton:"Lancer tutoriel",
		steps:{
			one: "C'est au tour d'Hugo et il a renversé six quilles. Sélectionnez le numéro 6...",
			two: "Top! Maintenant, confirmez le score d'Hugo en touchant son nom. La feuille de scorage au sommet sera mise à jour...",
			three: "Bravo! C'est au tour d'Emma. Elle n'a pas touché des quilles! Sélectionnez le numéro 0 et l'affecter à Emma.",
			four: "Hugo est en train de gagner! Vous pouvez obtenir le score aperçu détaillé en touchant la feuille de scorage en haut. Essayez-le..",
			five: "Si vous attribuez un mauvais score, vous pouvez annuler en touchant l'icône des options en haut et en sélectionnant 'Annuler dernière'. Essayez-le..",
			six: "Voila, vous êtes prêt! Quittez le jeu de tutoriel en touchant l'icône des options et en sélectionnant 'Quitter'."
		},
		help:{
			one: "Non! Sélectionnez le numéro 6",
			two: "Non! Sélectionnez le nom d'Hugo (marqué en rouge)",
			three: "Non! Sélectionnez le numéro 0, puis sélectionnez le nom d'Emma",
			four: "Non! Sélectionnez la feuille de scorage en haut de l'écran, puis refermez-le",
			five: "Non! Sélectionnez l'icône des options en haut à droite de l'écran, puis poussez le bouton 'Annuler dernière'",
			six: "Non! Sélectionnez l'icône des options en haut à droite de l'écran, puis poussez le bouton 'Quitter'"
		}
	}
};

var about = {
	En:{
		title:"About",
		body: 	"<p>molkkyScore.com is not a game in itself. It is a <strong>web app for keeping score on the game named 'mölkky'</strong> (also known as number kubb). For more information on the actual game, you can refer to the excellent website <a href='http://www.molkky.com' target='_blank'>www.molkky.com</a>.</p><p>molkkyScore.com is developed by <a href='http://www.fredericaerts.com' target='_blank'>Frederic Aerts</a>. Any questions, suggestions or bug reports can be directed to him via the email address <a href='mailto:info@molkkyScore.com' target='_top'>info@molkkyScore.com</a>. Developers are encouraged to contribute by forking on <a href='https://github.com/fredericJos/molkkyScore' target='_blank'>github</a>.</p><p><strong>Tip: </strong>this web app keeps working, even when you don't have internet connection.</p>"
	},
	Fr:{
		title:"À propos",
		body: "<p>molkkyScore.com n'est pas un jeu à part entière. C'est une <strong>application web pour garder le score sur le jeu nommé 'Mölkky'</strong> (également connu sous le nom number kubb). Pour plus d'informations sur le jeu réel, vous pouvez consulter l'excellent site <a href='http://www.molkky.com' target='_blank'>www.molkky.com</a>.</p><p>molkkyScore.com est développé par <a href='http://www.fredericaerts.com' target='_blank'>Frederic Aerts</a>. Questions, suggestions ou des rapports de bogues peuvent être adressées à lui en utilisant l'adresse e-mail <a href='mailto:info@molkkyScore.com' target='_top'>info@molkkyScore.com</a>. Les développeurs sont encouragés à contribuer par bifurquer sur <a href='https://github.com/fredericJos/molkkyScore' target='_blank'>github</a>.</p><p><strong>Tip: </strong>cette application web continue de fonctionner, même si vous n'avez pas de connexion internet.</p>"
	}
}

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
	$('.share-label span').fadeOut("fast",function(){
		$('.share-label span').text(eval("start."+language+".share"));
	}).fadeIn("fast");
}

function setTextModalAddPlayer(language){
	$("#modalAddPlayers .modal-title").text(eval("addPlayers."+language+".title"));
	$("#modalAddPlayers .btn-ready").text(eval("buttons."+language+".ready"));
	$("#modalAddPlayers .max-message").text(eval("addPlayers."+language+".max"));
}

function setTextModalConfirm(confirmType, language){
	//title
	var titleText = 'Confirmation required';
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

function setTextModalOptions(language){
	$("#modalOptions #btn-restart-options").text(eval("buttons."+language+".restart"));
	$("#modalOptions #btn-new-options").text(eval("buttons."+language+".newGame"));
	$("#modalOptions #btn-undo-options").text(eval("buttons."+language+".undo"));
	$("#modalOptions #btn-exit-options").text(eval("buttons."+language+".exit"));
	$("#modalOptions .btn-primary").text(eval("buttons."+language+".continueGame"));
}

function setTextModalNewPlayers(language){
	$("#modalNewPlayers .modal-title").text(eval("newPlayers."+language+".title"));
	$("#modalNewPlayers .modal-body").text(eval("newPlayers."+language+".body"));
	$("#modalNewPlayers #btn-no-newPlayers").text(eval("buttons."+language+".no"));
	$("#modalNewPlayers #btn-yes-newPlayers").text(eval("buttons."+language+".yes"));
	$("#modalNewPlayers #btn-cancel-newPlayers").text(eval("buttons."+language+".cancel"));
}

function setTextModalScoreboard(language){
	$("#modalScoreboard #btn-exit-scoreboard").text(eval("scoreboard."+language+".buttonExit"));
	$("#modalScoreboard #btn-newGame-scoreboard").text(eval("scoreboard."+language+".buttonNew"));
	$("#modalScoreboard .btn-primary").text(eval("buttons."+language+".continueGame"));
	$("#modalScoreboard #scoreboard__overview__link").text(eval("scoreboard."+language+".scoreboard"));
	$("#modalScoreboard #scoreboard__details__link").text(eval("scoreboard."+language+".details"));
}

function setTextModalAbout(language){
	$("#modalAbout .modal-title").text(eval("about."+language+".title"));
	$("#modalAbout .modal-body").html($.parseHTML(eval("about."+language+".body")));
}

function setTextTutorial(language){
	$("#modalTutorialIntro .modal-title").text(eval("tutorial."+language+".title"));
	$("#modalTutorialIntro .modal-body").html($.parseHTML(eval("tutorial."+language+".intro")));
	$("#modalTutorialIntro #btn-start-tutorial").text(eval("tutorial."+language+".introButton"));
}

function getTutorialHelpText(step, language){
	switch(step){
		case 1: return eval("tutorial."+language+".help.one");
				break;
		case 2: return eval("tutorial."+language+".help.two");
				break;
		case 3: return eval("tutorial."+language+".help.three");
				break;
		case 4: return eval("tutorial."+language+".help.four");
				break;
		case 5: return eval("tutorial."+language+".help.five");
				break;
		case 6: return eval("tutorial."+language+".help.six");
				break;
	}
}