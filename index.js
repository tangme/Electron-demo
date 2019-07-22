const { app, BrowserWindow, Menu  } = require('electron');
const ws = require('nodejs-websocket');
const ReadDevice = require('./src/main');


// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win;

/*------------------------- */
const template = [
    // { role: 'appMenu' }
    ...(process.platform === 'darwin' ? [{
        label: app.getName(),
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    }] : []),
    // { role: 'fileMenu' }
    {
        label: 'File',
        submenu: [
            { role: 'quit' },
            {
                label:'设置',
                click(){
                    // this.settingsWindow = new BrowserWindow({
                    //     width: Common.WINDOW_SIZE_SETTINGS.width,
                    //     height: Common.WINDOW_SIZE_SETTINGS.height * 0.9,
                    //     resizable: false,
                    //     fullscreenable: false,
                    //     show: false,
                    //     frame: true,
                    //     alwaysOnTop: true,
                    //     icon: 'assets/icon.png',
                    //     titleBarStyle: 'hidden',
                    // });
                    let winc = new BrowserWindow({ 
                        width: 400,
                        height: 300,
                        resizable: false,
                        fullscreenable: false,
                        // show: false,
                        frame: false,
                        alwaysOnTop: true, 
                        titleBarStyle: 'hidden',
                    });
                    winc.loadURL('https://github.com')
                }
            }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click() { require('electron').shell.openExternalSync('https://electronjs.org') }
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
/*----------------------------------- */

function createWindow() {
    // 创建浏览器窗口。
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // 加载index.html文件
    win.loadFile('index.html')

    // 打开开发者工具
    // win.webContents.openDevTools()

    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null
    });

    var server = ws.createServer(function(conn) {

        win.webContents.send('conn', { con: '连接已成功建立', time: new Date().toLocaleTimeString()});

        //收到信息
        conn.on("text", function(str) {
            console.log("Received " + str);
            ReadDevice.readJsonData((jsonStr)=>{
                conn.sendText(JSON.stringify(jsonStr));
                win.webContents.send('afterReadFile', jsonStr);
            });
        });

        //关闭
        conn.on("close", function(code, reason) {
            win.webContents.send('conn', { con: '连接已断开', time: new Date().toLocaleTimeString() });
            console.log("Connection closed")
        });

        //错误异常
        conn.on("error", function (errObj){
            console.log(errObj);
        });
    }).listen(8001);
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
        createWindow()
    }
})

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。


