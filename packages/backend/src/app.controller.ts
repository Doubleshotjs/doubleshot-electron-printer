import { Controller } from '@nestjs/common'
import { IpcHandle, IpcOn } from '@doubleshot/nest-electron'
import { AppService } from './app.service'
import { GET_PRINTER_LIST, HANDLE_PRINT } from './ipc'
import { Payload } from '@nestjs/microservices'
import type { PrintInfo } from '@shared/types'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) { }

  @IpcHandle(GET_PRINTER_LIST)
  getPrinterList() {
    return this.appService.getPrinterList()
  }

  @IpcOn(HANDLE_PRINT)
  handlePrint(@Payload() info: PrintInfo) {
    this.appService.handlePrint(info)
  }
}
