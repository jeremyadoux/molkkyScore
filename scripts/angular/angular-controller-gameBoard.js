app.controller("angular-gameBoard", function($scope,GameData,$rootScope) {
	$scope.toggleNumber = function(number){
		/* begin: tutorial */
		if($scope.tutorial && !$scope.tutorialInProcess){
			processNumberInTutorialModeScoped(number);
			return;
		}
		/* end: tutorial */

		/* begin: bosklapper stuff */
		if(GameData.getBosklappersMode()){
			// logic for number click bosklappers
			if(number == 0) {
				setBillyChar();
			}
			else{ 
				// bosklapper specific because of billy logic
				toggleNumberActivationBosklappers(number);
			}		
		}
		/* end: bosklapper stuff */

		else toggleNumberActivation(number);

		/* begin: bosklapper stuff */
		/* bosklappers activation logic */
		if(!GameData.gameHasStarted() && number == 0 && !GameData.getBosklappersMode()){
			if(checkBosklappersActivationCount(false)){
				GameData.setBosklappersMode(true);
				$('#td-0').removeClass('active');
				$('#td-player-name').removeClass('active');
				$rootScope.$broadcast('initializeBosklappers'); //generate 'initializeBosklappers' event
			}
		}
		if(number != 0)	checkBosklappersActivationCount(true);
		/* end: bosklapper stuff */		
    };

    $scope.options = function(number){
    	/* begin: tutorial */
		if($scope.tutorial && !$scope.tutorialInProcess){
			optionsInTutorialModeScoped();
			return;
		}
		/* end: tutorial */

    	/* begin: bosklapper stuff */
    	checkBosklappersActivationCount(true);
    	/* end: bosklapper stuff */

    	animateOptionsIcon();
		$rootScope.$broadcast('initializeOptions'); //generate 'initializeOptions' event
    };
    $scope.showScoreboard = function(number){
    	/* begin: tutorial */
		if($scope.tutorial && !$scope.tutorialInProcess){
			showScoreboardInTutorialModeScoped();
			return;	
		}
		/* end: tutorial */

    	/* begin: bosklapper stuff */
    	checkBosklappersActivationCount(true);
    	/* end: bosklapper stuff */

		$rootScope.$broadcast('initializeScoreboard'); //generate 'initializeScoreboard' event
    };
	$scope.processThrow = function(){
		/* begin: tutorial */
		if($scope.tutorial && !$scope.tutorialInProcess){
			processThrowTutorialScoped();
			return;	
		}
		/* end: tutorial */

		/* begin: bosklapper stuff */
    	checkBosklappersActivationCount(true);
    	if(GameData.getBosklappersMode()){
    		processThrowBosklappersScoped();
    	}
    	/* end: bosklapper stuff */
    	else{
    		if($('#mainTable #td-player-name').hasClass("active")){
				//calculate new score
				var scoreNumber = parseInt($('#mainTable .td-score-number.active').text());
				if(scoreNumber == 0){
					processMiss($scope.activePlayer);
				}
				else{
					processScore($scope.activePlayer,scoreNumber);
					if($scope.activePlayer.outOfTheGame){
						GameData.setRanking($scope.activePlayer);
						if($scope.activePlayer.winner){
							setIsRestoreGame(false);
							$rootScope.$broadcast('initializeScoreboard'); //generate 'initializeScoreboard' event
						}
					}
				}

				//go to next player
				$scope.activePlayer.myTurn = false;
				if(GameData.stillPlayersInTheGame()){
					var nextPlayer = GameData.getNextInGamePlayer($scope.activePlayer.index);						
					nextPlayer.myTurn = true;
					if(nextPlayer.index <= $scope.activePlayer.index){
						$scope.data.throwNumber++;
					}
					$scope.activePlayer = nextPlayer;
				}
				else{
					$rootScope.$broadcast('initializeScoreboard'); //game finished
				}
				$('#mainTable #td-player-name').removeClass("active");
				$('#mainTable .td-score-number.active').removeClass("active");
			}
    	}
    	/* write gameData to localStorage*/
    	if(!GameData.gameHasWinner() && !$scope.tutorial){
    		writeGameDataToLocalStorage($scope.players, $scope.data);
    	}
    };
    /* begin: tutorial*/
    $scope.nextStep = function(){
    	if($scope.tutorialInProcess) return;
    	$scope.tutorialInProcess = true;
    	$(".tutorial__content p").fadeOut("fast", function(){
    		switch($scope.tutorialData.step){
	    		case 1: $scope.stepText = tutorial.steps.two;
	    				$("#td-6").click();
	    				$scope.tutorialInProcess = false;
	    				break;
	    		case 2: $scope.stepText = tutorial.steps.three;
	    				$("#td-player-name").click();
	    				$scope.tutorialInProcess = false;
	    				break;
	    		case 3: if( !$("#td-0").hasClass("active")) $("#td-0").click();
	    				if($scope.manualTutorial){
	    					$("#td-player-name").click();
	    					$scope.tutorialInProcess = false;
	    						$scope.manualTutorial = false;
	    					$(".tutorial__content p").fadeOut("fast", function(){
	    						$scope.stepText = tutorial.steps.four;
	    						$scope.$apply();
	    					}).fadeIn("fast", function(){
					    		setTutorialArrowsPosition(true);
					    	});
	    				}
	    				else{
	    					setTimeout(function(){
		    					$("#td-player-name").click();
		    					$scope.tutorialInProcess = false;
		    					$(".tutorial__content p").fadeOut("fast", function(){
		    						$scope.stepText = tutorial.steps.four;
			    					$scope.$apply();
		    					}).fadeIn("fast", function(){
						    		setTutorialArrowsPosition(true);
						    	});
		    				}, 1000);
	    				}
	    				break;
	    		case 4: $("#scoreTable").click();
	    				var checkScoreboardOpen = setInterval(function(){ 
	    					if(!$("#modalScoreboard").hasClass("in")){
	    						clearInterval(checkScoreboardOpen);
	    						$scope.manualTutorial = false;
	    						$scope.tutorialInProcess = false;
	    						$(".tutorial__content p").fadeOut("fast", function(){
	    							$scope.stepText = tutorial.steps.five;
		    						$scope.$apply();
	    						}).fadeIn("fast", function(){
						    		setTutorialArrowsPosition(true);
						    	});
	    					} 
	    				}, 500);
	    				/*if(!$scope.manualTutorial){
	    					setTimeout(function(){
		    					if($("#modalScoreboard").hasClass("in")){
			    					$("#modalScoreboard .btn-primary").click();
			    				}
		    				}, 5000);
	    				}*/
	    				break;
	    		case 5: GameData.setTutorialStepFive(true);
	    				$("#td-options").click();
	    				var checkOptionsOpen = setInterval(function(){ 
	    					if(!$("#modalOptions").hasClass("in")){
	    						clearInterval(checkOptionsOpen);
	    						$scope.tutorialInProcess = false;
	    						$scope.manualTutorial = false;
	    						$(".tutorial__content p").fadeOut("fast", function(){
	    							if($scope.players[1].misses == 0){
		    							$scope.stepText = tutorial.steps.six;
		    							GameData.setTutorialStepFive(false);
		    						}
		    						else{
		    							$scope.tutorialData.step--;
		    							$scope.stepText = getTutorialHelpText($scope.tutorialData.step);
		    						}
	    							$scope.$apply();
	    						}).fadeIn("fast", function(){
						    		setTutorialArrowsPosition(true);
						    	});
	    					} 
	    				}, 500);
	    				/*if(!$scope.manualTutorial){
	    					setTimeout(function(){
		    					if($("#modalOptions").hasClass("in")){
		    						$("#modalOptions #btn-undo-options").click();
		    					}
		    				}, 5000);
	    				}*/
	    				break;
	    	}
	    	$scope.tutorialData.step++;
	    	$scope.$apply();
	    	$(".tutorial__content p").show();
	    	setTutorialArrowsPosition(true);
    	});	  	
    };
    $scope.prevStep = function(){
    	if($scope.tutorialInProcess) return;
    	$scope.tutorialInProcess = true;
    	$(".tutorial__content p").fadeOut("fast", function(){
    		switch($scope.tutorialData.step){
	    		case 2: $scope.stepText = tutorial.steps.one;
	    				$(".td-score-number").removeClass("active");
	    				$("#td-player-name").removeClass("active");
	    				break;
	    		case 3: $scope.stepText = tutorial.steps.two;
	    				$("#modalOptions #btn-undo-options").click();
	    				$(".td-score-number").removeClass("active");
	    				$("#td-player-name").removeClass("active").addClass("active");
	    				$("#td-6").addClass("active");
	    				break;
	    		case 4: $scope.stepText = tutorial.steps.three;
	    				$("#modalOptions #btn-undo-options").click();
	    				break;
	    		case 5: $scope.stepText = tutorial.steps.four;
	    				break;
	    		case 6: $scope.stepText = tutorial.steps.five;
	    				$("#td-0").click();
	    				$("#td-player-name").click();
	    				break;
	    	}
	    	$scope.tutorialData.step--;
	    	$scope.tutorialInProcess = false;
	    	$scope.$apply();
		    $(".tutorial__content p").fadeIn("fast", function(){
	    		setTutorialArrowsPosition(true);
	    	});
    	});
    };
    /* end: tutorial*/

    /* begin: functions */
    function processNumberInTutorialModeScoped(number){
    	switch($scope.tutorialData.step){
			case 1: if(number == 6) {
						$scope.manualTutorial = true;
						$scope.nextStep();
					}
					else {
						$(".tutorial__content p").fadeOut("fast", function(){
							$scope.stepText = getTutorialHelpText($scope.tutorialData.step);
							$scope.$apply();
						}).fadeIn("fast", function(){
				    		setTutorialArrowsPosition(true);
				    	});
					}
					break;
			case 3: if(number == 0){
						$("#td-0").toggleClass("active");
						$("#td-player-name").toggleClass("active");
					} 
					else{
						$(".tutorial__content p").fadeOut("fast", function(){
							$scope.stepText = getTutorialHelpText($scope.tutorialData.step);
							$scope.$apply();
						}).fadeIn("fast", function(){
				    		setTutorialArrowsPosition(true);
				    	});
					}
					break;
			default: 	$(".tutorial__content p").fadeOut("fast", function(){
							$scope.stepText = getTutorialHelpText($scope.tutorialData.step);
							$scope.$apply();	
						}).fadeIn("fast", function(){
				    		setTutorialArrowsPosition(true);
				    	});					 
		}
    }
    function optionsInTutorialModeScoped(){
    	switch($scope.tutorialData.step){
			case 5: $scope.manualTutorial = true;
					$scope.nextStep();
					break;
			default: 	animateOptionsIcon();
						$rootScope.$broadcast('initializeOptions'); //generate 'initializeOptions' event						 
		}
		/*$scope.$apply();*/
		/*setTutorialArrowsPosition(true);*/
    }
    function processThrowTutorialScoped(){
    	switch($scope.tutorialData.step){
			case 2: $scope.nextStep();
					break;
			case 3: if($("#td-0").hasClass("active")){
						$scope.manualTutorial = true;
						$scope.nextStep();
					} 
					else{
						$(".tutorial__content p").fadeOut("fast", function(){
							$scope.stepText = getTutorialHelpText($scope.tutorialData.step);
							$scope.$apply();
						}).fadeIn("fast", function(){
				    		setTutorialArrowsPosition(true);
				    	});
					}
					break;
			default: 	$(".tutorial__content p").fadeOut("fast", function(){
							$scope.stepText = getTutorialHelpText($scope.tutorialData.step);
							$scope.$apply();
						}).fadeIn("fast", function(){
				    		setTutorialArrowsPosition(true);
				    	});					 
		}
    }
    function showScoreboardInTutorialModeScoped(){
    	switch($scope.tutorialData.step){
			case 4: $rootScope.$broadcast('initializeScoreboard'); //generate 'initializeScoreboard' event
					$scope.manualTutorial = true;
					$scope.nextStep();
					break;
			default:	$(".tutorial__content p").fadeOut("fast", function(){
							$scope.stepText = getTutorialHelpText($scope.tutorialData.step);
							$scope.$apply();
						}).fadeIn("fast", function(){
				    		setTutorialArrowsPosition(true);
				    	});				 
		}
    }
    function processThrowBosklappersScoped(){
    	if($('#mainTable #td-player-name').hasClass("active")){
			//calculate new score
			var scoreNumber = -1;
			if ($("#mainTable .td-score-number.active")[0]){
				scoreNumber = parseInt($('#mainTable .td-score-number.active').text());
			}
			if(scoreNumber == 0){
				processMissBosklappers($scope.activePlayer);
			}
			else{
				processScoreBosklappers($scope.activePlayer, scoreNumber);
				if($scope.activePlayer.outOfTheGame){
					GameData.setRanking($scope.activePlayer);
					if($scope.activePlayer.winner){
						setIsRestoreGame(false);
						clearLocalStorageGameData();
						$rootScope.$broadcast('initializeScoreboard'); //generate 'initializeScoreboard' event
					}
				}
			}

			//go to next player
			$scope.activePlayer.myTurn = false;
			if(GameData.stillPlayersInTheGame()){
				var nextPlayer = GameData.getNextInGamePlayer($scope.activePlayer.index);						
				nextPlayer.myTurn = true;
				if(nextPlayer.index <= $scope.activePlayer.index){
					$scope.data.throwNumber++;
				}
				$scope.activePlayer = nextPlayer;
			}
			else{
				$rootScope.$broadcast('initializeScoreboard'); //game finished
			}
			$('#mainTable #td-player-name').removeClass("active");
			$('#mainTable .td-score-number.active').removeClass("active");
			$('#mainTable .td-score-number.active').removeClass("active");
			$('#mainTable #td-0.billyHalf').removeClass("billyHalf").text('0');
			$('#mainTable #td-0.billySuper').removeClass("billySuper").text('0');
		}
    }
    /* end: functions */

    //events
	$scope.$on('initializeGameBoard', function (event) {
		GameData.setTutorial(false);
		$scope.tutorial = false;
	    $scope.players = GameData.getPlayers();
	    $scope.players[0].myTurn = true;
	    $scope.activePlayer = $scope.players[0];
	    GameData.resetThrowNumber();
	    $scope.data = GameData.getData();
	    initializeMainTable($scope.players.length, false);
	    $scope.$apply();
	    $('#modalScoreboard').on('shown.bs.modal', function (e) {
		  	$('#modalScoreboard #scoreboardDetails th').css({width:100/$scope.players.length+"%"});
		  	$('#modalScoreboard #scoreboardDetails td').css({width:100/$scope.players.length+"%"});
		});
	});
	$scope.$on('updateGameBoard', function (event) {
	    $scope.players = GameData.getPlayers();
	    $scope.activePlayer = GameData.getActivePlayer();
	    $scope.data = GameData.getData(); 
	    if(!GameData.gameHasWinner() && !$scope.tutorial){
            writeGameDataToLocalStorage($scope.players, $scope.data);
        }
	});
	$scope.$on('restoreGameBoard', function (event) {
		var players= [];
		var data = {};
		if(localStorage.getItem("players") && localStorage.getItem("data")){
			players = JSON.parse(localStorage.getItem("players"));
			data = JSON.parse(localStorage.getItem("data"));
		}
		else{
			$rootScope.$broadcast('initializeAddPlayers');
			return;
			//TODO: error message
		}
		GameData.setPlayers(players);
		GameData.setData(data);
	    $scope.players = GameData.getPlayers();
	    $scope.data = GameData.getData();
	    $scope.activePlayer = GameData.getActivePlayer();
	    initializeMainTable($scope.players.length, false);
	    $scope.$apply();
	    $('#modalScoreboard').on('shown.bs.modal', function (e) {
		  	$('#modalScoreboard #scoreboardDetails th').css({width:100/$scope.players.length+"%"});
		  	$('#modalScoreboard #scoreboardDetails td').css({width:100/$scope.players.length+"%"});
		});
	});
	$scope.$on('initializeTutorial', function (event) {
		$scope.tutorialData = {
			step: 1
		}
		$scope.stepText = tutorial.steps.one;
		GameData.setPlayers(getTutorialPlayers());
		GameData.resetData();
		GameData.setTutorial(true);
	    $scope.players = GameData.getPlayers();
	    $scope.players[0].myTurn = true;
	    $scope.activePlayer = $scope.players[0];
	    $scope.data = GameData.getData();
	    initializeMainTable($scope.players.length, true);
	    $scope.tutorial = GameData.isTutorial();
	    $scope.$apply();
	    $('#modalScoreboard').on('shown.bs.modal', function (e) {
		  	$('#modalScoreboard #scoreboardDetails th').css({width:100/$scope.players.length+"%"});
		  	$('#modalScoreboard #scoreboardDetails td').css({width:100/$scope.players.length+"%"});
		});
		$('#modalTutorialIntro').modal('show');
	});
});


