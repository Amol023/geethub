var app = angular.module('geethub', []);

app.controller('displaytitle', function($scope) {
	$scope.name = '';
	$scope.click = function() {
		$scope.name = ' and welcome to Geethub!';
	}
})