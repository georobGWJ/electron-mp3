$(document).ready(function() {
    console.log( "Player loaded..." );
    playListener(song);
});

var song = 'media/audio/flies.mp3';

var playListener = function(song){
  new Audio(song).play();
}
