import 'virtual:uno.css'
import '@src/styles/index.scss'

async function start() {
  const isPrinter = window.isElectron && window.isPrinter
  const { bootstraps } = await (isPrinter ? import('./bootstraps/printer') : import('./bootstraps/app'))
  bootstraps()
}

start()
