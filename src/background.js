'use strict'

import {app, protocol, BrowserWindow, ipcMain} from 'electron'
import {
  createProtocol,
  /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600, frame: false, webPreferences: {
    nodeIntegration: true
  } })
  win.setMenu(null)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })

  win.maximize()
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }

  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// OWN CODE

const fs = require('fs')
const directoriesPath = app.getAppPath() +'/data/directories.json'
const configFilename = '/config.json'
let directories = {}

let getDirectoriesPath = function () {
  fs.readFile(directoriesPath, function read(err, data) {
    if (err) {
      throw err
    }
    directories = JSON.parse(data)
  })
}
getDirectoriesPath()

// Save config event
ipcMain.on('save_config', function (event, config) {
  let isDone = false
  try {
    // Save directories to app data directories file and global variable
    directories = { "data_dir": config.data_dir, "import_dir": config.import_dir }
    fs.writeFileSync(directoriesPath, JSON.stringify(directories), 'utf-8')

    // Save config file to data_dir path
    let pathData = config.data_dir.path.replace('app://', app.getAppPath() + '/')
    fs.writeFileSync(pathData + configFilename, JSON.stringify(config), 'utf-8')
    isDone = true
  } catch(e) { alert('Fallo al guardar la configuración!') }

  win.webContents.send('save_config', isDone)
})

// Get config event
ipcMain.on('get_config', function () {
  let configToReturn = {}
  try {
    // Get config path from data dir in directories variable
    let pathData = directories.data_dir.path.replace('app://', app.getAppPath() + '/')

    // Get config data from file config
    let rawData = fs.readFileSync(pathData + configFilename, function read(err, data) {
      if (err) {
        throw err
      }
    })
    configToReturn = JSON.parse(rawData)
  } catch(e) { alert('Fallo al guardar la configuración!') }

  win.webContents.send('get_config', configToReturn)
})
