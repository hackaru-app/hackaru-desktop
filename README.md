# Hackaru Desktop

[![Build Status](https://travis-ci.org/ktmouk/hackaru-desktop.svg?branch=master)](https://travis-ci.org/ktmouk/hackaru-desktop)

Automatically time tracking using [Hackaru](https://github.com/ktmouk/hackaru).

## Feature

- This app is created using [Electron](https://github.com/electron/electron). Support Windows, macOS and Linux.
- Automatically time tracking. (e.g., When you launch an Atom editor, start 'Development' activity.)
- Tracking your computer status. (e.g., When your notebook will be suspend, stop the timer.)
- Completely open source.

## Installation

### Mac
 1. Download hackaru-osx.zip from [Release](https://github.com/ktmouk/hackaru-desktop/releases).
 2. Extract zip file and execute Hackaru-x.y.z.dmg.
 3. Move Hackaru icon to Application folder.

### Windows
 1. Download hackaru-win.zip from [Release](https://github.com/ktmouk/hackaru-desktop/releases).
 2. Extract zip file and execute Hackaru-x.y.z.exe.

### Linux
 1. Download hackaru-linux.zip from [Release](https://github.com/ktmouk/hackaru-desktop/releases).
 2. Extract zip file and execute Hackaru-0.1.0.AppImage.


## Contributors

1. [Fork it](https://github.com/ktmouk/hackaru-desktop/fork).

2. Clone a forked repository and create a new branch.
```
$ git checkout -b new-feature
```

3. Run this app in dev mode.
```
$ npm install
$ npm run dev
```
> This app is using [atom/node-keytar](https://github.com/atom/node-keytar) to store OAuth tokens.  
> So you may need to install libsecret if build on Linux. See [Detail](https://github.com/atom/node-keytar).

4. Improve codes.

5. Run ESLint.
```
$ npm run lint:fix
```

6. If it has no problem, Create a new Pull request!

## License

- [MIT](./LICENSE)

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli).
