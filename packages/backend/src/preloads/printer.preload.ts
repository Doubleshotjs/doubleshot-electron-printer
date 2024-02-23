import type { PrintInfo } from "@shared/types"
import { ON_PREPARE_PRINT, HANDLE_PRINT } from "@src/ipc"
import { contextBridge, ipcRenderer } from "electron"


contextBridge.exposeInMainWorld(
  'printer',
  {
    onPreparePrint: (cb: (info: PrintInfo) => void) => {
      ipcRenderer.on(ON_PREPARE_PRINT, (_, info) => cb(info))
    },
    handlePrint: () => ipcRenderer.send(HANDLE_PRINT)
  }
)

contextBridge.exposeInMainWorld(
  'isPrinter',
  true
)