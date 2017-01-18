$(document).ready(function() {
    console.log( "Player loaded..." );
    // Set button listeners
    playListener();
    pauseListener();
    songSelectListener();
    volumeListener();
    // Load local database of song attributes
    loadMediaList("./app/data/local_media.json");
    // Dynamically populate song selection form
    populateMediaList();
});

// Load essential Electron Components
let app = require('electron').remote;
let dialog = app.dialog;
let fs = require('fs'); // And load the Filesystem Component

// Create local variables to track data
let audio;
let media_db;
let audio_id;

var populateMediaList = function() {
  var container = document.getElementById('select-form-div');

  for (var idx=0; idx < media_db.length; idx++) {
    // Create an <input> element, set its type and name attributes
    var input = document.createElement("input");
    input.type = "radio";
    input.name = "song";
    input.value = media_db.local[idx].id;
    container.appendChild(input);
    container.appendChild(document.createTextNode("\t"+media_db.local[idx].title));
    // Append a line break
    container.appendChild(document.createElement("br"));
  }
}

var loadMediaList = function(file) {
  fs.readFile(file, 'utf-8', function(err, data) {
    if(err) {
      alert("The playlist could not be loaded:\n" + err.message)
      return;
    }
    console.log('The playlist JSON is: ' + data);
    media_db = JSON.parse(data);
  })

}

var setSong = function(song_id) {
  audio_id = song_id;
  console.log(media_db.local[song_id].path)
  if (audio) {
    audio.pause();
  }
  audio = new Audio();
  audio.setAttribute('src',media_db.local[song_id].path);
  audio.load();
  $('#song-name').text(media_db.local[song_id].title);
};

var playListener = function() {
  $( '#play-btn' ).click(function( event ) {
    var newSong = $('input[name="song"]:checked').val();
    setSong(newSong);
    audio.play();
  })
};

var pauseListener = function(){
  $( '#pause-btn' ).click(function( event ) {
    audio.pause();
  })
};

var songSelectListener = function() {
  $( '#select-form' ).submit(function( event ) {
    event.preventDefault();
    console.log($('input[name="song"]:checked').val());
    var newSong = $('input[name="song"]:checked').val();
    setSong(newSong);
    audio.play();
  })
};

var volumeListener = function() {
  $('#volume-select').on("input change", function() {
    var vol = $('input[name=volume]').val()
    document.getElementById('volume-label').innerHTML = ("<strong>Volume:</strong><br>" + vol);
    audio.volume = (vol/100);
  });
};
