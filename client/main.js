angular.module('geethub', [])

.controller('Displaytitle', function($scope, Search) {
	$scope.name = '';
	// $scope.artist = {
	// 	results: ''
	// };
	$scope.click = function() {
		$scope.name = ' and welcome to Geethub!';
	}
	$scope.artist = function() {
		Search.searchArtist($scope.artist.results)
			.then(function(data) {
				console.log('Data is ', data);
			})
	}
})

.factory('Search', function($http, $window) {
	var searchArtist = function(search) {
		return $http({
			method: 'GET',
			url: 'https://api/spotify.com/v1/search',
			data: {
	            search: search,
	            type: 'album'
        	}, 
		})
		.then(function(resp) {
			return resp.data;
		});
	};

	return {
		searchArtist: searchArtist
	}
});