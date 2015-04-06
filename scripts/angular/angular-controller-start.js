$(document).ready(function(){  
    var language = 'En';
    if(window["localStorage"]){
        language = localStorage.getItem("language");
        if(!language){ //on first-time usage of app
            language = 'En';
            localStorage.setItem("language",language);
        }
        $('.loading-title').text(eval("loading."+language+".startApp"));
    }// else english is default 
    $('.loader-container').show();
    setTimeout(function(){
        $('.secondaryFontloader').remove();
        $('.loader-container').hide();
        if(isRestoreGame()){
            setTextModalRestoreGame(language);
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

app.controller("angular-modal-start", ['$scope','GameData','$rootScope', function($scope,GameData,$rootScope) {
    $scope.startGame = function(){
    	$('#modalStart').modal('hide');
    	$rootScope.$broadcast('initializeAddPlayers'); //generate 'initializeAddPlayers' event

        if(hasNetwork){
            ga('send', {
              'hitType': 'event',
              'eventCategory': 'buttonClick',
              'eventAction': 'startGame'
            });
        }
    };
    $scope.settings = function(){
        $('#modalStart').modal('hide');
        $rootScope.$broadcast('initializeSettingsGame'); //generate 'initializeSettingsGame' event
    };
    $scope.about = function(){
    	$('#modalStart').modal('hide');
        $scope.language = GameData.getLanguage();
        setTextModalAbout($scope.language);
    	$('#modalAbout').modal('show');

        if(hasNetwork){
            ga('send', {
              'hitType': 'event',
              'eventCategory': 'buttonClick',
              'eventAction': 'about'
            });
        }
    };
    $scope.tutorial = function(){
    	$('#modalStart').modal('hide');
        $('.loading-title').text(eval("loading."+$scope.language+".tutorial"));
        $('.loader-container').show();
        setTimeout(function(){
            $('.loader-container').hide();
            $rootScope.$broadcast('initializeTutorial'); //generate 'initializeTutorial' event
        }, loadingTime); 

        if(hasNetwork){
            ga('send', {
              'hitType': 'event',
              'eventCategory': 'buttonClick',
              'eventAction': 'startTutorial'
            });
        }
    };
    $scope.shareFacebook = function(){
        if(hasNetwork){
            FB.ui(
             {
              method: 'share',
              href: 'http://molkkyscore.com/'
            }, function(response){});

            ga('send', {
              'hitType': 'social',
              'socialNetwork': 'facebook',
              'socialAction': 'share',
              'socialTarget': 'http://molkkyscore.com'
            });
        }
        else{
            setTextModalNoNetwork($scope.language);
            $('#modalNoNetwork').modal('show');
        }
    };
    $scope.shareTwitter = function(){
        if(hasNetwork){
            var width  = 575,
                height = 400,
                left   = ($(window).width()  - width)  / 2,
                top    = ($(window).height() - height) / 2,
                url    = '',
                opts   = 'status=1' +
                    ',width='  + width  +
                    ',height=' + height +
                    ',top='    + top    +
                    ',left='   + left;
            if($scope.language == "En"){
                url= 'https://twitter.com/share?lang=en&text=Keeping%20score%20on%20the%20game%20%27m%C3%B6lkky%27%20made%20easy%20by&url=http%3A%2F%2Fmolkkyscore.com';
            }
            else if($scope.language == "Fr"){
                url='https://twitter.com/share?lang=fr&text=Compter%20les%20points%20sur%20le%20jeu%20M%C3%B6lkky%20est%20facilit%C3%A9%20par&url=http%3A%2F%2Fmolkkyscore.com';
            }
            else{ // english
                url= 'https://twitter.com/share?lang=entext=Keeping%20score%20on%20the%20game%20%27m%C3%B6lkky%27%20made%20easy%20by&url=http%3A%2F%2Fmolkkyscore.com';
            }
                
            window.open(url, 'twitter', opts);

            ga('send', {
              'hitType': 'social',
              'socialNetwork': 'twitter',
              'socialAction': 'share',
              'socialTarget': 'http://molkkyscore.com'
            });

            return false;
        }
        else{
            setTextModalNoNetwork($scope.language);
            $('#modalNoNetwork').modal('show');
        }
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
        // set language
        var language = localStorage.getItem("language");
        if(!language){ //on first-time usage of app
            language = 'En';
            localStorage.setItem("language",language);
        }
        GameData.setLanguage(language);
        // set settingsGame
        var settings = localStorage.getItem("settings");
        if(!settings){ //on first-time usage of app
            settings = GameData.getSettings();
            localStorage.setItem("settings",JSON.stringify(settings));
        }
        else{
            GameData.setSettings(JSON.parse(settings));
        }
    }
    $scope.language = GameData.getLanguage();
    setTextModalStart($scope.language);
}]);


