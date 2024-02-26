import { Window } from '@doubleshot/nest-electron'
import { Injectable } from '@nestjs/common'
import type { PrintInfo, PrinterInfo } from '@shared/types'
import { screen, BrowserWindow, app, BrowserView } from 'electron'
import { join } from 'path'
import { ON_PREPARE_PRINT } from './ipc'

@Injectable()
export class AppService {
  private readonly printView: BrowserView
  private currentPrintInfo: PrintInfo | null = null

  constructor(
    @Window() private readonly mainWin: BrowserWindow,
  ) {
    const isDev = !app.isPackaged

    this.printView = new BrowserView({
      webPreferences: {
        contextIsolation: true,
        preload: join(__dirname, 'printer.preload.js') // <-- use pinter's preload
      }
    })

    this.printView.webContents.loadURL(isDev
      ? process.env.DS_RENDERER_URL
      : `file://${join(app.getAppPath(), 'frontend/index.html')}`)

    if (isDev) {
      // in dev mode, add the printView to the main window for preview
      this.mainWin.setBrowserView(this.printView)
      // set the printView's position to the bottom right corner
      const { width, height } = this.mainWin.getBounds()
      this.printView.setBounds({ x: width - 300, y: height - 200, width: 300, height: 200 })
      // on main window resize, update the printView's position
      this.mainWin.on('resize', () => {
        const { width, height } = this.mainWin.getBounds()
        this.printView.setBounds({ x: width - 300, y: height - 200, width: 300, height: 200 })
      })

      // open dev tools
      this.mainWin.webContents.openDevTools({ mode: 'detach' })
      this.printView.webContents.openDevTools({ mode: 'detach' })
    }
  }

  public getScaleFactor(): number {
    const { scaleFactor } = screen.getPrimaryDisplay()
    return scaleFactor
  }

  public async getPrinterList(): Promise<PrinterInfo[]> {
    const printers = await this.mainWin.webContents.getPrintersAsync()
    return printers
  }

  public preparePrint(info: PrintInfo) {
    this.currentPrintInfo = info
    this.printView.webContents.send(ON_PREPARE_PRINT, info)
  }

  public handlePrint() {
    if (!this.currentPrintInfo) {
      return
    }

    const {
      deviceName,
      landscape = false,
      margins = { marginType: 'default' },
      pageSize = { name: 'A4', size: { width: 300, height: 200 } },
      dpi = 300
    } = this.currentPrintInfo
    this.printView.webContents.print({
      silent: true,
      deviceName,
      landscape,
      margins,
      pageSize: pageSize.name === 'Custom' ? pageSize.size : pageSize.name,
      dpi: { horizontal: dpi, vertical: dpi }
    })

    this.currentPrintInfo = null
  }
}
