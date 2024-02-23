export const IS_PRINTER = window.isPrinter

export const {
  getPrinterList,
  preparePrint
} = window.electron ?? {}

export const {
  onPreparePrint,
  handlePrint
} = window.printer ?? {}