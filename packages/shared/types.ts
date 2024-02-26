import type { WebContentsPrintOptions, Size } from 'electron'

export type { PrinterInfo } from 'electron'

export interface PrintInfo {
  // content setting
  content: string
  fontSize: number
  // print setting
  deviceName: string
  landscape: WebContentsPrintOptions['landscape']
  margins: Exclude<WebContentsPrintOptions['margins'], undefined>
  pageSize: {
    name: Exclude<WebContentsPrintOptions['pageSize'], Size> | 'Custom'
    size: { width: number, height: number }
  }
  dpi: number
}

