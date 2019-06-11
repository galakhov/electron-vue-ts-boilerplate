'use strict';

import { app, protocol, BrowserWindow, dialog } from 'electron';

// import fs from 'fs'; // node.js types: a replacement for a require
// import fs = require('fs');
import * as fs from 'fs';

import {
  createProtocol,
  installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';
const isDevelopment = process.env.NODE_ENV !== 'production';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null;
let secondWin: BrowserWindow | null;
let createdAppProtocol = false;

const createWindow = (
  winVar: BrowserWindow | null,
  devPath: string,
  prodPath: string
) => {
  // Create the browser window.
  winVar = new BrowserWindow({
    width: 1280,
    height: 800,
    useContentSize: true,
    titleBarStyle: 'hiddenInset',
    show: false,
    frame: false,
    fullscreenable: false,
    movable: true,
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    winVar.loadURL((process.env.WEBPACK_DEV_SERVER_URL as string) + devPath);
    if (!process.env.IS_TEST) {
      winVar.webContents.openDevTools();
    }
  } else {
    if (!createdAppProtocol) {
      createProtocol('app');
      createdAppProtocol = true;
      // Load the index.html when not in development
      // winVar.loadURL("app://./index.html");
      winVar.loadURL(`app://./${prodPath}`);
    }

    // start some background processes/scripts/routines here...
  }

  // to avoid a blank flashing page on start
  winVar.once('ready-to-show', () => {
    if (winVar) {
      winVar.show();
    }
  });

  winVar.on('closed', () => {
    winVar = null;
  });
};

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    // createWindow();
    // win = createWindow(win, "", "index.html");
    createWindow(win, '', 'index.html');
  }
  // if (secondWin === null) {
  //   createWindow(secondWin, "subpage", "subpage.html");
  // }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools();
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log('Vue Devtools failed to install:', e.toString());
    }
  }
  createWindow(win, '', 'index.html');
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
