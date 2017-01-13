'use strict';

const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Prevent the main app window from being garbage collected
let mainWindow

function createWindow() {
  // Create the main window for the app
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // Load the main index page of the app
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }))

  // Handle closing the window (thus the app)
  mainWindow.on('closed', () => {
    mainWindow = null;
  })
}

// Create the window on app start
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    app.quit()
})
