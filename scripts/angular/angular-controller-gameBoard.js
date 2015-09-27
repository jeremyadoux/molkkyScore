app.controller("angular-gameBoard", ['$scope','GameData','$rootScope', function($scope,GameData,$rootScope) {
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

		if(hasNetwork && !$scope.tutorial){
            ga('send', {
              'hitType': 'event',
              'eventCategory': 'buttonClick',
              'eventAction': 'showScoreboard'
            });
        }
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
					processMiss($scope.activePlayer, $scope.settings.misses);
					if($scope.activePlayer.disqualified == true && GameData.numberOfPlayersInTheGame() < 2){
						setIsRestoreGame(false);
						$rootScope.$broadcast('initializeScoreboard'); //generate 'initializeScoreboard' event
					}
				}
				else{
					processScore($scope.activePlayer,scoreNumber,$scope.settings.maxPoints,$scope.settings.exceedMax);
					if($scope.activePlayer.outOfTheGame){
						GameData.setRanking($scope.activePlayer);
						if($scope.activePlayer.winner){
							setIsRestoreGame(false);
							$rootScope.$broadcast('initializeScoreboard'); //generate 'initializeScoreboard' event
							if(hasNetwork){
					            ga('send', {
					              'hitType': 'event',
					              'eventCategory': 'gameEvent',
					              'eventAction': 'gamesHasWinner'
					            });
					        }
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
    	
    		switch($scope.tutorialData.step){
	    		case 1: $(".tutorial__content p").fadeOut("fast", function(){
	    					$scope.stepText = eval("tutorial."+$scope.language+".steps.two");
		    				$scope.toggleNumber(6);
		    				$scope.tutorialInProcess = false;
		    				$scope.tutorialData.step++;
					    	$scope.$apply();
					    	$(".tutorial__content p").fadeIn("fast", function(){
					    		setTutorialArrowsPosition(true);
					    	});
	    				});	
	    				break;
	    		case 2: $(".tutorial__content p").fadeOut("fast", function(){
	    					$scope.stepText = eval("tutorial."+$scope.language+".steps.three");
		    				$scope.processThrow();
		    				$scope.tutorialInProcess = false;
		    				$scope.tutorialData.step++;
					    	$scope.$apply();
					    	$(".tutorial__content p").fadeIn("fast", function(){
					    		setTutorialArrowsPosition(true);
					    	});
	    				});	
	    				break;
	    		case 3: if( !$("#td-0").hasClass("active")){
	    					$("#td-0").addClass("active");
	    					$("#td-player-name").addClass("active");
	    				} 
	    				if($scope.manualTutorial){
	    					$scope.processThrow();
	    					$scope.tutorialInProcess = false;
	    					$scope.manualTutorial = false;
	    					$(".tutorial__content p").fadeOut("fast", function(){
	    						$scope.stepText = eval("tutorial."+$scope.language+".steps.four");
	    						$scope.tutorialData.step++;
	    						$scope.$apply();
	    					}).fadeIn("fast", function(){
					    		setTutorialArrowsPosition(true);
					    	});
	    				}
	    				else{
	    					setTimeout(function(){
		    					$scope.processThrow();
		    					$scope.tutorialInProcess = false;
		    					$(".tutorial__content p").fadeOut("fast", function(){
		    						$scope.stepText = eval("tutorial."+$scope.language+".steps.four");
		    						$scope.tutorialData.step++;
			    					$scope.$apply();
		    					}).fadeIn("fast", function(){
						    		setTutorialArrowsPosition(true);
						    	});
		    				}, 1000);
	    				}
	    				break;
	    		case 4: $scope.showScoreboard();
	    				var checkScoreboardOpen = setInterval(function(){ 
	    					if(!$("#modalScoreboard").hasClass("in")){
	    						clearInterval(checkScoreboardOpen);
	    						$scope.manualTutorial = false;
	    						$scope.tutorialInProcess = false;
	    						$(".tutorial__content p").fadeOut("fast", function(){
	    							$scope.stepText = eval("tutorial."+$scope.language+".steps.five");
	    							$scope.tutorialData.step++;
		    						$scope.$apply();
	    						}).fadeIn("fast", function(){
						    		setTutorialArrowsPosition(true);
						    	});
	    					} 
	    				}, 500);
	    				break;
	    		case 5: GameData.setTutorialStepFive(true);
	    				$scope.options();
	    				var checkOptionsOpen = setInterval(function(){ 
	    					if(!$("#modalOptions").hasClass("in")){
	    						clearInterval(checkOptionsOpen);
	    						$scope.tutorialInProcess = false;
	    						$scope.manualTutorial = false;
	    						$(".tutorial__content p").fadeOut("fast", function(){
	    							if($scope.players[1].misses == 0){
		    							$scope.stepText = eval("tutorial."+$scope.language+".steps.six");
		    							$scope.tutorialData.step++;
		    							GameData.setTutorialStepFive(false);
		    						}
		    						else{
		    							$scope.stepText = getTutorialHelpText($scope.tutorialData.step,$scope.language);
		    						}
	    							$scope.$apply();
	    						}).fadeIn("fast", function(){
						    		setTutorialArrowsPosition(true);
						    	});
	    					} 
	    				}, 500);
	    				if(hasNetwork){
				            ga('send', {
				              'hitType': 'event',
				              'eventCategory': 'tutorialEvent',
				              'eventAction': 'finishTutorial'
				            });
				        }
	    				break;
	    	}
    };
    $scope.prevStep = function(){
    	if($scope.tutorialInProcess) return;
    	$scope.tutorialInProcess = true;
    	$(".tutorial__content p").fadeOut("fast", function(){
    		switch($scope.tutorialData.step){
	    		case 2: $scope.stepText = eval("tutorial."+$scope.language+".steps.one");
	    				$(".td-score-number").removeClass("active");
	    				$("#td-player-name").removeClass("active");
	    				break;
	    		case 3: $scope.stepText = eval("tutorial."+$scope.language+".steps.two");
	    				$("#modalOptions #btn-undo-options").click();
	    				$(".td-score-number").removeClass("active");
	    				$("#td-player-name").removeClass("active").addClass("active");
	    				$("#td-6").addClass("active");
	    				break;
	    		case 4: $scope.stepText = eval("tutorial."+$scope.language+".steps.three");
	    				$("#modalOptions #btn-undo-options").click();
	    				break;
	    		case 5: $scope.stepText = eval("tutorial."+$scope.language+".steps.four");
	    				break;
	    		case 6: $scope.stepText = eval("tutorial."+$scope.language+".steps.five");
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
							$scope.stepText = getTutorialHelpText($scope.tutorialData.step,$scope.language);
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
							$scope.stepText = getTutorialHelpText($scope.tutorialData.step,$scope.language);
							$scope.$apply();
						}).fadeIn("fast", function(){
				    		setTutorialArrowsPosition(true);
				    	});
					}
					break;
			default: 	$(".tutorial__content p").fadeOut("fast", function(){
							$scope.stepText = getTutorialHelpText($scope.tutorialData.step,$scope.language);
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
							$scope.stepText = getTutorialHelpText($scope.tutorialData.step,$scope.language);
							$scope.$apply();
						}).fadeIn("fast", function(){
				    		setTutorialArrowsPosition(true);
				    	});
					}
					break;
			default: 	$(".tutorial__content p").fadeOut("fast", function(){
							$scope.stepText = getTutorialHelpText($scope.tutorialData.step,$scope.language);
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
							$scope.stepText = getTutorialHelpText($scope.tutorialData.step,$scope.language);
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
				processScoreBosklappers($scope.activePlayer, scoreNumber, $scope.settings.maxPoints);
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
	    $scope.settings = GameData.getSettings();
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
	    $scope.settings = GameData.getSettings();
	    if(!GameData.gameHasWinner() && !$scope.tutorial){
            writeGameDataToLocalStorage($scope.players, $scope.data);
        }
	});
	$scope.$on('restoreGameBoard', function (event) {
		var players= [];
		var data = {};
		var settings = {};
		if(localStorage.getItem("players") && localStorage.getItem("data") && localStorage.getItem("settings")){
			players = JSON.parse(localStorage.getItem("players"));
			data = JSON.parse(localStorage.getItem("data"));
			settings = JSON.parse(localStorage.getItem("settings"));
		}
		else{ // not all necessary data for restore available in localStorage
			$rootScope.$broadcast('initializeAddPlayers');
			return;
			//TODO: error message
		}
		GameData.setPlayers(players);
		GameData.setData(data);
		GameData.setSettings(settings);
	    $scope.players = GameData.getPlayers();
	    $scope.data = GameData.getData();
	    $scope.settings = GameData.getSettings();
	    $scope.activePlayer = GameData.getActivePlayer();
	    initializeMainTable($scope.players.length, false);
	    $scope.$apply();
	    $('#modalScoreboard').on('shown.bs.modal', function (e) {
		  	$('#modalScoreboard #scoreboardDetails th').css({width:100/$scope.players.length+"%"});
		  	$('#modalScoreboard #scoreboardDetails td').css({width:100/$scope.players.length+"%"});
		});
	});
	$scope.$on('initializeTutorial', function (event) {
		$scope.language = GameData.getLanguage();
        setTextTutorial($scope.language);
		$scope.tutorialData = {
			step: 1
		}
		$scope.stepText = eval("tutorial."+$scope.language+".steps.one");
		GameData.setPlayers(getTutorialPlayers($scope.language));
		GameData.resetData();
		GameData.setTutorial(true);
	    $scope.players = GameData.getPlayers();
	    $scope.players[0].myTurn = true;
	    $scope.activePlayer = $scope.players[0];
	    $scope.data = GameData.getData();
	    $scope.settings = GameData.getSettings(); 
	    initializeMainTable($scope.players.length, true);
	    $scope.tutorial = GameData.isTutorial();
	    $scope.$apply();
	    $('#modalScoreboard').on('shown.bs.modal', function (e) {
		  	$('#modalScoreboard #scoreboardDetails th').css({width:100/$scope.players.length+"%"});
		  	$('#modalScoreboard #scoreboardDetails td').css({width:100/$scope.players.length+"%"});
		});
		$('#modalTutorialIntro').modal('show');
	});
}]);


