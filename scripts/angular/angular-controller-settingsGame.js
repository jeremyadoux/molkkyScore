app.controller("angular-modal-settingsGame", ['$scope','GameData','$rootScope', function($scope, GameData, $rootScope) {
    $scope.setMaxPoints = function(maxPointsSetting){
        $scope.settings.maxPoints = maxPointsSetting;
    };
    $scope.setMisses = function(missesSetting){
        $scope.settings.misses = missesSetting;
    };
    $scope.btnSave = function(){
        if(window["localStorage"]){
            localStorage.setItem("settings",JSON.stringify($scope.settings));
        }
        GameData.setSettings($scope.settings);
        $('#modalSettingsGame').modal('hide');
        showModal('#modalStart');
    };

    //events
    $scope.$on('initializeSettingsGame', function (event) {
        if(window["localStorage"]){
            if(!localStorage.getItem("settings")){ //on first-time usage of app
                $scope.settings = GameData.getSettings();
                localStorage.setItem("settings",JSON.stringify($scope.settings));
            }
            else{
                $scope.settings = JSON.parse(localStorage.getItem("settings"));
                GameData.setMaxPointsSetting($scope.settings.maxPoints);
                GameData.setMissesSetting($scope.settings.misses);
            }
        }
        else{
            $scope.settings = GameData.getSettings();
        }
        initializeSettingsGameModal($scope.settings);   
    });
}]);