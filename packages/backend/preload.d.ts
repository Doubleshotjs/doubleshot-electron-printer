import type { PrinterInfo } from 'electron'

declare global {
  interface Window {
    electron: {
      useZoomFactor(): { update: () => Promise<void> }
      getPrinterList(): Promise<PrinterInfo[]>
    },
    isElectron: boolean
  }
}

export { }