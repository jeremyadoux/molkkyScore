$(document).ready(function(){  
    if(window["localStorage"]){
        var language = localStorage.getItem("language");
        if(!language){ //on first-time usage of app
            language = 'En';
            localStorage.setItem("language",language);
        }
        $('.loading-title').text(eval("loading."+language+".startApp"));
    }// else english is default 
    $('.loader-container').show();
    setTimeout(function(){
        $('.loader-container').hide();
        if(isRestoreGame()){
            showModal('#restoreGame');
        }
        else{
            showModal('#modalStart');          
        }
    }, 4000);

    // reopen 'start' modal on closing 'about' modal
    $('#modalAbout').on('hidden.bs.modal', function (e) {
        showModal('#modalStart');
    });
});

app.controller("angular-modal-start", function($scope,GameData,$rootScope) {
    $scope.startGame = function(){
    	$('#modalStart').modal('hide');
    	$rootScope.$broadcast('initializeAddPlayers'); //generate 'initializeAddPlayers' event
    };
    $scope.about = function(){
    	$('#modalStart').modal('hide');
        $scope.language = GameData.getLanguage();
        setTextModalAbout($scope.language);
    	$('#modalAbout').modal('show');
    };
    $scope.tutorial = function(){
    	$('#modalStart').modal('hide');
        $('.loading-title').text(eval("loading."+$scope.language+".tutorial"));
        $('.loader-container').show();
        setTimeout(function(){
            $('.loader-container').hide();
            $rootScope.$broadcast('initializeTutorial'); //generate 'initializeTutorial' event
        }, loadingTime); 
    };
    $scope.En = function(){
        if($scope.language == 'En') return;
        $scope.language = 'En';
        setTextModalStart($scope.language);
        GameData.setLanguage($scope.language);
        if(window["localStorage"]){
            localStorage.setItem("language",$scope.language);
        }
    };
    $scope.Fr = function(){
        if($scope.language == 'Fr') return;
        $scope.language = 'Fr';
        setTextModalStart($scope.language);
        GameData.setLanguage($scope.language);
        if(window["localStorage"]){
            localStorage.setItem("language",$scope.language);
        }
    };

    if(window["localStorage"]){
        var language = localStorage.getItem("language");
        if(!language){ //on first-time usage of app
            language = 'En';
            localStorage.setItem("language",language);
        }
        GameData.setLanguage(language);
    }
    $scope.language = GameData.getLanguage();
    setTextModalStart($scope.language);
});


