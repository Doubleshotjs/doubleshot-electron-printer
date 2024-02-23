import { contextBridge, webFrame, ipcRenderer } from 'electron'
import { GET_DEVICE_SCALE_FACTOR, GET_PRINTER_LIST } from '../ipc'

contextBridge.exposeInMainWorld(
  'electron',
  {
    useZoomFactor: () => {
      const DESIGN_HEIGHT = 1080
      const DESIGN_DPR = 1
      const DESIGN_SCALE_FACTOR = 1
      let scaleFactor = 0

      const update = async () => {
        const height = window.innerHeight
        const dpr = window.devicePixelRatio
        if (scaleFactor === 0) scaleFactor = await ipcRenderer.invoke(GET_DEVICE_SCALE_FACTOR)

        const factor = (height / DESIGN_HEIGHT) * (dpr / DESIGN_DPR) * (DESIGN_SCALE_FACTOR / scaleFactor)
        webFrame.setZoomFactor(factor)
      }

      return {
        update
      }
    },
    getPrinterList: () => ipcRenderer.invoke(GET_PRINTER_LIST),
  },
)
