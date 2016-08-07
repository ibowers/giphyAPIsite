$(document).ready(function() {

var topics = ['mario','resident evil','grand theft auto v','sonic','pokemon','battlefield 4','rainbow six siege','metal gear solid','final fantasy'];


// Make buttons from the topics array
function createButtons(){
	for(i = 0; i < topics.length; i++){
		var gifButton = $('<button class="titles">' + topics[i] + '</button>');
		gifButton.attr('value', topics[i]);
		$(gifButton).appendTo('#giphyButtons');
	};
};

createButtons();

// Assign value to the buttons from the button text
$('#addVideoGame').on('click', function(){
	var title = $('#gif-input').val();
	topics.push(title);
	$('#giphyButtons').html('');
	sort();
	$('#gif-input').val('');
});


// On click will pull value of button to assign to giphy url limited to 10
$('.titles').on('click', function(){
	var value = this.value;
	console.log(value);

	$.ajax({
		url: "http://api.giphy.com/v1/gifs/search?q=" + value + "&api_key=dc6zaTOxFJmzC&limit=10",
		method: 'GET'
	})

		// Giphy URL will serve gifs and ratings to the gifsViewer ID
		.done(function(response) {
			console.log(response);

			var results = response.data;

			for (i = 0; i < results.length; i++){

				var randomGif = $('<img>');
				randomGif.attr('src', results[i].images.fixed_height.url);
				console.log(randomGif);

				var randomRating = $('<p>').text("Rating: " + results[i].rating);

				$('#gifsViewer').prepend(randomGif);
				$('#gifsViewer').prepend(randomRating);

			};
		});
});


});