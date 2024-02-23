import { contextBridge, ipcRenderer } from 'electron'
import { GET_PRINTER_LIST, PREPARE_PRINT } from '../ipc'
import type { PrintInfo } from '@shared/types'

contextBridge.exposeInMainWorld(
  'electron',
  {
    getPrinterList: () => ipcRenderer.invoke(GET_PRINTER_LIST),
    preparePrint: (info: PrintInfo) => ipcRenderer.send(PREPARE_PRINT, info),
  },
)
