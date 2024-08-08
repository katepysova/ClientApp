const { app, BrowserWindow, ipcMain, Notification, nativeImage } = require("electron");
const sqlite3 = require("sqlite3").verbose();
const os = require("os");
const path = require("path");
const system = os.platform().toLowerCase();
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

const IS_DEV = process.env.BABEL_ENV === "development";

if (require("electron-squirrel-startup")) {
  app.quit();
}

const appIcon = nativeImage.createFromPath(path.join(process.cwd(), "/src/images/logo.png"));
appIcon.setTemplateImage(true);

let dbPath;
if (system.startsWith("darwin")) {
  dbPath = "/Library/Application Support/PowerObserver/energy_measurements.db";
} else {
  dbPath = path.join(os.tmpdir(), "PowerObserver/energy_measurements.db");
}

let db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log("Error opening DB");
  } else {
    console.log("DB connected");
  }
});

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 800,
    icon: appIcon,
    webPreferences: {
      // eslint-disable-next-line no-undef
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      contextIsolation: true
    },
    autoHideMenuBar: false
  });

  // and load the index.html of the app.
  // eslint-disable-next-line no-undef
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  if (IS_DEV) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.maximize();
};

app
  .whenReady()
  .then(() => {
    createWindow();
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  })
  .then(() => {
    if (process.platform === "win32") {
      app.setAppUserModelId(app.name);
    }
  });

ipcMain.handle("fetchData", async (event, query) => {
  return new Promise((resolve, reject) => {
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
});

ipcMain.on("notify", (_, payload) => {
  if (Notification.isSupported()) {
    console.log(path.join(__dirname), process.cwd());
    const notificationOptions = {
      silent: false,
      hasReply: false,
      timeoutType: "never",
      icon: appIcon,
      ...payload
    };

    const notification = new Notification({ ...notificationOptions });
    notification.show();
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
