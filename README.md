[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![Build Status](https://travis-ci.org/ktmouk/hackaru-desktop.svg?branch=master)](https://travis-ci.org/ktmouk/hackaru-desktop)
[![Maintainability](https://api.codeclimate.com/v1/badges/5b7af3e22e611188ea0d/maintainability)](https://codeclimate.com/github/ktmouk/hackaru-desktop/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5b7af3e22e611188ea0d/test_coverage)](https://codeclimate.com/github/ktmouk/hackaru-desktop/test_coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

<p align="center">
  <p align="center"><img src="./docs/images/screenshot.png" width="500" /></p>
  <p align="center">Hackaru for desktop</p>
</p>

## Downloads
- [MacOS](https://github.com/ktmouk/hackaru-desktop/releases/download/v1.0.0/Hackaru-1.0.0.dmg)
- [Windows](https://github.com/ktmouk/hackaru-desktop/releases/download/v1.0.0/Hackaru-1.0.0.exe)
- [Linux](https://github.com/ktmouk/hackaru-desktop/releases/download/v1.0.0/Hackaru-1.0.0.AppImage)


## Contributing
1. [Fork](https://github.com/ktmouk/hackaru-web/fork) and clone this repository.
1. Check out new branch. `git checkout -b new-feature`
1. Start app in dev mode. `npm install && npm run dev`
1. Improve codes.
1. Run linter and test. `npm run lint && npm run test`
1. Push branch. `git push origin new-feature`
1. Create a new pull request.

> This app is using [atom/node-keytar](https://github.com/atom/node-keytar) to store OAuth tokens.  
> So you may need to install libsecret if build on Linux. See [detail](https://github.com/atom/node-keytar).

## License

- [MIT](./LICENSE)
