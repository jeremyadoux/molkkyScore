app.controller("angular-modal-bosklappers", ['$scope','GameData','$rootScope', function($scope,GameData,$rootScope) {	
    $scope.btnOk = function(){
        $('#modalBosklappers').modal('hide');
        $('#mainTable').fadeIn(1000);
    };
    $scope.btnCancel = function(){
    	GameData.setBosklappersMode(false);
    	checkBosklappersActivationCount(true);
        $('#modalBosklappers').modal('hide');
        $('#mainTable').fadeIn(1000);
    };

    //events
    $scope.$on('initializeBosklappers', function (event) {
    	$('#modalBosklappers').modal('show');
    });
}]);