/// <reference types="vite/client" />

interface Window {
  isPrinter?: boolean
  electron: {
    getPrinterList(): Promise<import('@shared/types').PrinterInfo[]>
    handlePrint(info: import('@shared/types').PrintInfo): void
  },
}