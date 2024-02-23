import { contextBridge } from "electron"

contextBridge.exposeInMainWorld(
  'isPrinter',
  true
)