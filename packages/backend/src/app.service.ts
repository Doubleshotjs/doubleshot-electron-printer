import { Window } from '@doubleshot/nest-electron'
import { Injectable } from '@nestjs/common'
import type { PrintInfo, PrinterInfo } from '@shared/types'
import { screen, BrowserWindow, app } from 'electron'

@Injectable()
export class AppService {
  constructor(
    @Window() private readonly mainWin: BrowserWindow,
  ) {
    const isDev = !app.isPackaged
    if (isDev)
      this.mainWin.webContents.openDevTools({ mode: 'detach' })
  }

  public getScaleFactor(): number {
    const { scaleFactor } = screen.getPrimaryDisplay()
    return scaleFactor
  }

  public async getPrinterList(): Promise<PrinterInfo[]> {
    const printers = await this.mainWin.webContents.getPrintersAsync()
    return printers
  }

  public handlePrint(info: PrintInfo) {
    console.log('handlePrint', info)
    const { deviceName } = info
    this.mainWin.webContents.print({
      silent: true,
      deviceName,
      // margins: {
      //   marginType: 'printableArea'
      // }
    })
  }
}
