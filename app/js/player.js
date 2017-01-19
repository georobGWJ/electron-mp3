// Load essential Electron Components
let app = require('electron').remote;
let dialog = app.dialog; // Load the dialog Component
let fs = require('fs'); // And load the Filesystem Component

// Create local variables to track data
let audio;  // current song or podcast object
let mediaDB; // list of songs as a JSON object
let audioID; // current song JSON id. I might not need this...

$(document).ready(function() {
    console.log( "Player loaded..." );

    // Dynamically populate song selection form
    // console.log(loadMediaList("./app/data/local_media.json")); // mediaDB is 'undefined' when I try this
    populateMediaList("./app/data/local_media.json");

    // Set button listeners
    playListener();
    pauseListener();
    songSelectListener();
    volumeListener();
});

// Functions!
function populateMediaList(file) {
  var container = document.getElementById('select-form-div');

  mediaDB = JSON.parse(fs.readFileSync(file,'utf8'));
  console.log (mediaDB)

  for (var idx=0; idx < mediaDB.local.length; idx++) {
    // Create an <input> element, set its type and name attributes
    var input = document.createElement("input");
    input.type = "radio";
    input.name = "song";
    input.value = mediaDB.local[idx].id;
    container.appendChild(input);
    container.appendChild(document.createTextNode("\t"+mediaDB.local[idx].title));
    // Append a line break
    container.appendChild(document.createElement("br"));
  }
}

function setSong(song_id) {
  audio_id = song_id;
  console.log(mediaDB.local[song_id].path)
  if (audio) {
    audio.pause();
  }
  audio = new Audio();
  audio.setAttribute('src',mediaDB.local[song_id].path);
  audio.load();
  $('#song-name').text(mediaDB.local[song_id].title);
};

function playListener() {
  $( '#play-btn' ).click(function( event ) {
    var newSong = $('input[name="song"]:checked').val();
    setSong(newSong);
    audio.play();
  })
};

function pauseListener(){
  $( '#pause-btn' ).click(function( event ) {
    audio.pause();
  })
};

function songSelectListener() {
  $( '#select-form' ).submit(function( event ) {
    event.preventDefault();
    console.log($('input[name="song"]:checked').val());
    var newSong = $('input[name="song"]:checked').val();
    setSong(newSong);
    audio.play();
  })
};

function volumeListener() {
  $('#volume-select').on("input change", function() {
    var vol = $('input[name=volume]').val()
    document.getElementById('volume-label').innerHTML = ("<strong>Volume:</strong><br>" + vol);
    audio.volume = (vol/100);
  });
};
