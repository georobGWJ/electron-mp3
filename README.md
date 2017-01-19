# electron-mp3
A standalone mp3 player built with Electron.

## Installation
This app requires that [Electron](http://electron.atom.io/) be installed on your system.

Electron can be installed via Node Package Manager (npm) as documented [here](https://www.npmjs.com/package/electron).

This app uses jquery as a dependency. To install jquery (3.1.1) locally type `npm install` in the root directory.


## Run the app
This mp3 player can be started by typing either `electron .` or `npm start` whilst in the `/electron-mp3/` directory.

## Status
* Basic control UI complete.
* You can Play and Pause any one of the four test mp3 files in the project.

## To Do
* Add Dialog window to add MP3 JSON to playlist file
* Add checkboxes and logic to remove or otherwise manipulate playlist
* Add bar to visually represent progress through playing song
* Add logic to read ID3 tags from MP3 files
