"use strict";

import { app, protocol, BrowserWindow } from "electron";
import {
    createProtocol,
    installVueDevtools
} from "vue-cli-plugin-electron-builder/lib";
const isDevelopment = process.env.NODE_ENV !== "production";

//读取文件
import { ipcMain } from "electron";
const path = require("path");
const fs = require("fs");
const ReadDevice = require("./views/demo/business/readfile/co/main");
const ws = require("nodejs-websocket");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: "app", privileges: { secure: true, standard: true } }
]);

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        // fullscreen: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.maximize();

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
        if (!process.env.IS_TEST) win.webContents.openDevTools();
    } else {
        createProtocol("app");
        // Load the index.html when not in development
        win.loadURL("app://./index.html");
    }

    win.on("closed", () => {
        win = null;
    });

    var server = ws
        .createServer(function(conn) {
            win.webContents.send("conn", {
                con: "连接已成功建立",
                time: new Date().toLocaleTimeString()
            });

            // 收到信息
            conn.on("text", function(str) {
                console.log("Received " + str);
                ReadDevice.readJsonData(jsonStr => {
                    conn.sendText(JSON.stringify(jsonStr));
                    win.webContents.send("afterReadFile", jsonStr);
                });
            });

            // 关闭
            conn.on("close", function(code, reason) {
                win.webContents.send("conn", {
                    con: "连接已断开",
                    time: new Date().toLocaleTimeString()
                });
                console.log("Connection closed");
            });

            // 错误异常
            conn.on("error", function(errObj) {
                console.log(errObj);
            });
        })
        .listen(8001);
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
    createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === "win32") {
        process.on("message", data => {
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

//----------------读取文件-----------------
function readDefaultFilePath() {
    var dbPath = path.join(
        app.getPath("userData"),
        "/configDB",
        "defaultFile.txt"
    );
    console.log(dbPath);
    fs.readFile(dbPath, (err, data) => {
        if (err) {
            if (err.errno === -4058) {
                console.log("未找到文件");
                createDir(dbPath);
            } else {
                console.log("其它问题");
            }
        }
        global.defaultFile = data.toString();
        console.log(global.defaultFile);
    });
}
function createDir(pathStr) {
    fs.mkdir(path.dirname(pathStr), { recursive: true }, err => {
        if (err) throw err;
        fs.writeFile(pathStr, "C:\\avis1.txt", "utf-8", err => {
            if (err) throw err;
            console.log("The file has been saved!");
            readDefaultFilePath();
        });
    });
}

readDefaultFilePath();

ipcMain.on("readFile", (event, data) => {
    ReadDevice.readJsonData(jsonStr => {
        win.webContents.send("afterReadFile", jsonStr);
    });
});

ipcMain.on("fetchCinfig", (event, data) => {
    win.webContents.send("cinfigData", {
        defaultFile: global.defaultFile
    });
});

ipcMain.on("updateDefaultFile", (event, data) => {
    console.log(data);
    var dbPath = path.join(
        app.getPath("userData"),
        "/configDB",
        "defaultFile.txt"
    );
    fs.writeFile(dbPath, data, "utf-8", err => {
        if (err) throw err;
        console.log("The file has been saved!");
    });
});
