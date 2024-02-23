import { Controller } from '@nestjs/common'
import { IpcHandle } from '@doubleshot/nest-electron'
import { AppService } from './app.service'
import { GET_DEVICE_SCALE_FACTOR, GET_PRINTER_LIST } from './ipc'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) { }

  @IpcHandle(GET_DEVICE_SCALE_FACTOR)
  getDeviceScaleFactor() {
    return this.appService.getScaleFactor()
  }

  @IpcHandle(GET_PRINTER_LIST)
  getPrinterList() {
    return this.appService.getPrinterList()
  }
}
