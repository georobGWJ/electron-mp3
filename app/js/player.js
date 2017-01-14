$(document).ready(function() {
    console.log( "Player loaded..." );
    playListener();
    pauseListener();
});

var song = 'media/audio/flies.mp3';
let audio


var setSong = function(song) {
  audio = new Audio(song);
}

// Temporary test code
setSong(song);
// End test code

var playListener = function() {
  $( '#play-btn' ).click(function( event ) {
    audio.play();
  })
}

var pauseListener = function(){
  $( '#pause-btn' ).click(function( event ) {
    audio.pause();
  })
}
