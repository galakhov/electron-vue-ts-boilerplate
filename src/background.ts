"use strict";

import { app, protocol, BrowserWindow, dialog } from "electron";

// import fs from 'fs'; // node.js types: a replacement for a require
// import fs = require('fs');
import * as fs from "fs";

import {
  createProtocol,
  installVueDevtools,
} from "vue-cli-plugin-electron-builder/lib";
const isDevelopment = process.env.NODE_ENV !== "production";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: "app", privileges: { secure: true, standard: true } }]);

// export
const getFilesInFolders = () => {
  const files = dialog.showOpenDialog({
    properties: ["openFile", "multiSelections"],
    buttonLabel: "Select bookmarks",
    title: "Selecting bookmarks",
    filters: [
      { name: "HTML Files", extensions: ["html", "htm"] },
      // { name: 'Archive Files', extensions: ['zip', 'rar'] },
    ],
  });

  if (!files) { return; }

  const file = files[0];

  const content = fs.readFileSync(file).toString();

  // tslint:disable-next-line:no-console
  console.log(content);
};

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    useContentSize: true,
    titleBarStyle: "hiddenInset",
    show: false,
    frame: false,
    fullscreenable: false,
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true,
    },
    movable: true,
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) {
      win.webContents.openDevTools();
    }
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");

    getFilesInFolders();
  }

  // to avoid a blank flashing page on start
  win.once("ready-to-show", () => {
    if (win) {
      win.show();
    }
  });

  win.on("closed", () => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools();
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
