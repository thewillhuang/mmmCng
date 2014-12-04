'use strict';

module.exports = function(app) {
  app.controller('mmmCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.hiddenMMM = true;
    $scope.onClick = function() {
      $scope.calculate();
    };
    $scope.calculate = function() {
      console.log($scope.mmm.input);
      var splitArray = $scope.mmm.input.split(' ');
      var numArray = JSON.parse('[' + splitArray + ']');
      console.log(numArray);
      $http({
        method: 'POST',
        url: '/mmm',
        data: numArray
      })
      .success(function(data) {
        $scope.mmm.mean = data.mean;
        $scope.mmm.mode = data.mode;
        $scope.mmm.median = data.median;
        $scope.hiddenMMM = false;
      })
      .error(function(data, status) {
        console.log(data);
        console.log(status);
      });
    };
  }]);
};
