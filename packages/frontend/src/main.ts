import 'virtual:uno.css'
import '@src/styles/index.scss'
import { IS_PRINTER } from './electron'

async function start() {
  const { bootstraps } = await (IS_PRINTER ? import('./bootstraps/printer') : import('./bootstraps/app'))
  bootstraps()
}

start()
