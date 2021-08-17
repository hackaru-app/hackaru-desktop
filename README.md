[![Maintainability](https://api.codeclimate.com/v1/badges/5b7af3e22e611188ea0d/maintainability)](https://codeclimate.com/github/hackaru-app/hackaru-desktop/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5b7af3e22e611188ea0d/test_coverage)](https://codeclimate.com/github/hackaru-app/hackaru-desktop/test_coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

<p align="center">
  <p align="center"><img src="./docs/images/screenshot.png" width="500" /></p>
  <p align="center">Hackaru for desktop</p>
</p>

## Download
- [MacOS](https://github.com/hackaru-app/hackaru-desktop/releases/download/v1.2.4/hackaru-desktop-v1.2.4.dmg)
- [Windows](https://github.com/hackaru-app/hackaru-desktop/releases/download/v1.2.4/hackaru-desktop-v1.2.4.exe)
- [Linux](https://github.com/hackaru-app/hackaru-desktop/releases/download/v1.2.4/hackaru-desktop-v1.2.4.AppImage)

## Feedback

Do you find a bug or would like to submit feature requests?  
Please let us know via [Issues](https://github.com/hackaru-app/hackaru-desktop/issues). 😉

## Build
```sh
# Clone this repository.
git clone git@github.com:hackaru-app/hackaru-desktop.git
cd hackaru-desktop

# Copy and rename env file.
cp .env.sample .env

# Install packages and launch the app.
yarn && yarn dev
```

This app is using [atom/node-keytar](https://github.com/atom/node-keytar) to store OAuth tokens.  
You may need to install libsecret if build on Linux. See [detail](https://github.com/atom/node-keytar).

## License

- [MIT](./LICENSE)
