$(document).ready(function() {
    console.log( "Player loaded..." );
    playListener(song);
});

var song = 'media/audio/flies.mp3';
let audio

var setSong = function(song) {
  audio = new Audio(song);
}

var playListener = function() {
  // Get tab id that is clicked on and make that <li> active
  $( '#play-btn' ).click(function( event ) {
    $(event.target).parent().addClass("active").siblings().removeClass("active");
  })
}

var playListener = function(){
  audio.play();
}
