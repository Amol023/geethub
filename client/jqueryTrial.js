$( document ).ready(function() {
	var templateSource = document.getElementById('results-template').innerHTML;
	var template = Handlebars.compile(templateSource);
	var resultsPlaceholder = document.getElementById('results');
	var playingCssClass = 'playing';
	var audioObj = null;


	var fetchTracks = function(albumId, callback) {
		$.ajax({
			url: 'https://api.spotify.com/v1/albums/' + albumId,
			success: function(response) {
				console.log(response);
				callback(response);
			}
		});
	};

	var searchAlbums = function (query) {
	    $.ajax({
	        url: 'https://api.spotify.com/v1/search',
	        data: {
	            q: query,
	            type: 'album'
	        },
	        success: function (response) {
	        	console.log('Response is', response)
	            resultsPlaceholder.innerHTML = template(response);
	        }
	    });
	};

	document.getElementById('results').addEventListener('click', function(e) {
		var target = e.target;
		if (target !== null && target.classList.contains('cover')) {
			if (target.classList.contains(playingCssClass)) {
				audioObj.pause();
			} else {
				if (audioObj) {
					audioObj.pause();
				}
				fetchTracks(target.getAttribute('data-album-id'), function(data) {
					audioObj = new Audio(data.tracks.items[0].preview_url);
					audioObj.play();
					target.classList.add(playingCssClass);
					audioObj.addEventListener('ended', function() {
						target.classList.remove(playingCssClass);
					});
					audioObj.addEventListener('pause', function() {
						target.classList.remove(playingCssClass);
					});
				});
			}
		}
	});

	document.getElementById('search-form').addEventListener('submit',
		function (e) {
			e.preventDefault();
			searchAlbums(document.getElementById('query').value);
		}, false);
});