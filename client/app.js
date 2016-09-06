$( document ).ready(function() {
	var templateSource = document.getElementById('results-template').innerHTML;
	var template = Handlebars.compile(templateSource);
	var resultsPlaceholder = document.getElementById('results');
	var playingCssClass = 'playing';
	var audioObj = null;


	//Gets data from Spotify and creates a template
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

	// Queries audio files from Spotify and calls a callback
	var fetchTracks = function(albumId, callback) {
		$.ajax({
			url: 'https://api.spotify.com/v1/albums/' + albumId,
			success: function(response) {
				console.log(response);
				callback(response);
			}
		});
	};

	// Manipulates handlerbars template and calls query function on click
	document.getElementById('results').addEventListener('click', function(e) {
		var target = e.target;
		console.log(target);
		if (target !== null && target.classList.contains('cover')) {
			//if already playing, then pause
			if (target.classList.contains(playingCssClass)) {
				audioObj.pause();
			} else {
				//if the audio object already exists, then pause on click
				if (audioObj) {
					audioObj.pause();
				}

				//else, set the data-id to album id
				// create a new audio element, with the prview URl
				fetchTracks(target.getAttribute('data-album-id'), function(data) {
					audioObj = new Audio(data.tracks.items[0].preview_url);
					audioObj.play();
					//after playing, create a class to suggest that
					target.classList.add(playingCssClass);
					//remove the class when the preview ends
					audioObj.addEventListener('ended', function() {
						target.classList.remove(playingCssClass);
					});
					// also remove class when pause
					audioObj.addEventListener('pause', function() {
						target.classList.remove(playingCssClass);
					});
				});
			}
		}
	});

	// Takes in user input and calls the query function
	document.getElementById('search-form').addEventListener('submit',
		function (e) {
			e.preventDefault();
			searchAlbums(document.getElementById('query').value);
		}, false);
});
