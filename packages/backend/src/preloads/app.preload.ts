import { contextBridge, ipcRenderer } from 'electron'
import { GET_PRINTER_LIST, HANDLE_PRINT } from '../ipc'
import type { PrintInfo } from '@shared/types'

contextBridge.exposeInMainWorld(
  'electron',
  {
    getPrinterList: () => ipcRenderer.invoke(GET_PRINTER_LIST),
    handlePrint: (info: PrintInfo) => ipcRenderer.send(HANDLE_PRINT, info),
  },
)
