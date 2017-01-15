$(document).ready(function() {
    console.log( "Player loaded..." );
    playListener();
    pauseListener();
    songSelectListener();
    volumeListener();
    let song_db;
    loadJSON(function(response) {
      song_db = JSON.parse(response);
     });

    // let song_db = JSON.parse($.getJSON("data/local_media.json"));
    console.log(song_db);
});

let audio

var loadJSON = function(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', "data/local_media.json", false);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

var setSong = function(song) {
  audio = new Audio(song);
  $('#song-name').text(song);
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
    audio.pause();
    console.log($('input[name="song"]:checked').val());
    var newSong = $('input[name="song"]:checked').val();
    setSong(newSong);
    audio.play();
  })
}

var volumeListener = function() {
  $('#volume-select').on("input change", function() {
    var vol = $('input[name=volume]').val()
    document.getElementById('volume-label').innerHTML = ("Volume: " + vol);
    audio.volume = (vol/100);
  });
}
