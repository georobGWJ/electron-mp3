$(document).ready(function() {
    console.log( "Player loaded..." );
    playListener();
    pauseListener();
    songSelectListener();
});

let audio

var setSong = function(song) {
  audio = new Audio(song);
}

// Set song to Danger by default
setSong('media/audio/vibration.mp3');
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

var songSelectListener = function() {
  $( '#select-form' ).submit(function( event ) {
    event.preventDefault();
    console.log($('input[name="song"]:checked').val());
    var newSong = $('input[name="song"]:checked').val();
    setSong(newSong);
  })
}
