$(document).ready(function() {
    console.log( "Player loaded..." );
    // Set button listeners
    playListener();
    pauseListener();
    songSelectListener();
    volumeListener();
    // Load local database of song attributes
    loadJSON(function(response) {
      media_db = JSON.parse(response);
    });
    // Dynamically populate song selection form
    populateMediaList();
});

// Load essential Electron Components
let remote = require('remote'); // Component that has the dialog Component
let dialog = remote.require('dialog'); // Now load the Dialog Component
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
