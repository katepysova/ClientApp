// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  fetchData: (query) => ipcRenderer.invoke("fetchData", query),
  notify: (message) => ipcRenderer.send("notify", message)
});
