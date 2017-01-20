// Load essential Electron Components
let app = require('electron').remote;
let dialog = app.dialog; // Load the dialog Component
let fs = require('fs'); // And load the Filesystem Component

// Create local variables to track data
let audio = new Audio();  // current song or podcast object
let audio_id; // playlist index of current media object
let mediaDB; // list of songs as a JSON object
let audioID; // current song JSON id. I might not need this...
let playlistFile = "./app/data/local_media.json"; // Local playlist file

$(document).ready(function() {
    console.log( "Player loaded..." );

    // Dynamically populate song selection form
    populateMediaList(playlistFile);

    // Set button listeners
    playListener();
    pauseListener();
    deleteListener();
    songSelectListener();
    volumeListener();

    // Test function(s)
    printPlaylist();
    // addSongToPlaylist({ "id": 4, "title": "November Rain", "length": 900, "path": "media/audio/rain.mp3"});
    // writePlaylist(playlistFile);
});

// Functions!
function populateMediaList(file) {
  var container = document.getElementById('select-form-div');

  // Load playlist
  mediaDB = JSON.parse(fs.readFileSync(file,'utf8'));

  for (var idx=0; idx < mediaDB.local.length; idx++) {
    // Create an <input> element, set its type and name attributes
    var input = document.createElement("input");
    input.type = "checkbox";
    input.name = "song";
    input.value = idx;
    container.appendChild(input);
    container.appendChild(document.createTextNode("\t"+mediaDB.local[idx].title));
    // Append a line break
    container.appendChild(document.createElement("br"));
  }
}

function setSong(idx) {
  audio_id = idx;
  // console.log(mediaDB.local[idx].path);
  if (audio) {
    audio.pause();
  }
  audio.setAttribute('src',mediaDB.local[idx].path);
  audio.load();
  $('#song-name').text(mediaDB.local[idx].title);
};

function getCheckedSongs() {
  return $('input[name=song]:checked');
}

function playListener() {
  $( '#play-btn' ).click(function( event ) {
    // FIX: This loops through all songs, not just the selected ones...
    var newSong = $('input[name="song"]:checked').val();
    console.log("playListener: " + newSong);
    setSong(newSong);
    audio.play();
    playNextOnEnd();
  })
};

function pauseListener(){
  $( '#pause-btn' ).click(function( event ) {
    audio.pause();
  })
};

// Listener to start next song once one is completed.
function playNextOnEnd() {
  audio.onended = function() {
    setSong(parseInt(audio_id) + 1);
    audio.play();
    playNextOnEnd();
  };
}

// Deprecated function. This button doesn't exist now.
function songSelectListener() {
  $( '#select-form' ).submit(function( event ) {
    event.preventDefault();
    console.log($('input[name="song"]:checked').val());
    var newSong = $('input[name="song"]:checked').val();
    setSong(newSong);
    audio.play();
  })
};

function deleteListener() {
  $( '#delete-btn' ).click(function( event ) {
    var deleteUs = getCheckedSongs();

    for (var idx=0; idx<deleteUs.length; idx++) {
      // And stick the checked ones onto an array...
      console.log(mediaDB.local[idx]);

    }
  })
}

function volumeListener() {
  $('#volume-select').on("input change", function() {
    var vol = $('input[name=volume]').val()
    document.getElementById('volume-label').innerHTML = ("<strong>Volume:</strong><br>" + vol);
    audio.volume = (vol/100);
  });
};

function printPlaylist() {
  console.log(mediaDB);
}

function addSongToPlaylist(newSong) {
  mediaDB.local.push(newSong);
  // Test line
  console.log(mediaDB);
}

function writePlaylist(file) {
  fs.writeFile(file, JSON.stringify(mediaDB), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
}
