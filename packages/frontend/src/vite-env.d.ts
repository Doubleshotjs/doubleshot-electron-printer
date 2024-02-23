/// <reference types="vite/client" />

interface Window {
  isPrinter?: boolean
  electron: {
    useZoomFactor(): { update: () => Promise<void> }
    getPrinterList(): Promise<import('electron').PrinterInfo[]>
  },
}