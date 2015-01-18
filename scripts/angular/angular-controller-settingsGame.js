app.controller("angular-modal-settingsGame", ['$scope','GameData','$rootScope', function($scope, GameData, $rootScope) {
    $scope.setMaxPoints = function(maxPointsSetting){
        $scope.settings.maxPoints = maxPointsSetting;
    };
    $scope.setExceedMax = function(exceedMaxSetting){
        $scope.settings.exceedMax = exceedMaxSetting;
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
        $scope.settings = GameData.getSettings();
        setTextModalSettingsGame(GameData.getLanguage());
        initializeSettingsGameModal($scope.settings);   
    });
}]);