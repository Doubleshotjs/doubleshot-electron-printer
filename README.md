<p align="center">
    <img width="800" src="./screenshot.png" alt="screenshot">
</p>

<br>

## Doubleshot Electron Printer

## How to use

It is recommended to use [pnpm](https://pnpm.io/) as the default package manager.

- Install dependencies first:

  ```sh
  pnpm install
  ```

- Run in development mode:

  ```sh
  pnpm dev
  ```

- Build for production:

  ```sh
  pnpm run build
  ```

## Directory
```sh
  ├─┬ packages
  │ ├── backend                   # backend/main process part
  │ └── frontend                  # frontend/renderer process part
  ├── electron-builder.config.js  # electron-builder config file
  ├── package.json
  └── dsr.config.ts               # @doubleshot/runner config file
```