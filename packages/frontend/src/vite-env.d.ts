/// <reference types="vite/client" />

interface Window {
  isPrinter?: boolean
  electron: {
    getPrinterList(): Promise<import('@shared/types').PrinterInfo[]>
    preparePrint(info: import('@shared/types').PrintInfo): void
  },
  printer: {
    onPreparePrint(cb: (info: import('@shared/types').PrintInfo) => void): void
    handlePrint(): void
  }
}