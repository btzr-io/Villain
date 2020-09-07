<h2 align=center>
 <img width="40%" alt="Villain logo" src="https://raw.githubusercontent.com/btzr-io/Villain/master/artworks/logo.svg?sanitize=true" />
</h2>

<h4 align="center">
The open source web-based comic book reader that you need, but don't deserve.
</h4>

<h3 align=center>
  <a href="https://www.npmjs.com/package/villain-react" title="dependencies status">
    <img alt="npm" src="https://img.shields.io/npm/v/villain-react">
  </a>
  <a href="https://david-dm.org/btzr-io/Villain" title="dependencies status">
    <img alt="status" src="https://david-dm.org/btzr-io/Villain/status.svg"/>
  </a>
  <a href="https://github.com/btzr-io/Villain/graphs/contributors">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/btzr-io/Villain.svg" alt="contributors">
  </a>
 <a href="https://github.com/btzr-io/Villain/blob/master/LICENSE">
 <img alt="GitHub license" src="https://img.shields.io/github/license/btzr-io/Villain">
 </a>
</h3>

<br/>

## Installation

```shell
$ yarn add villain-react
```

## WebWorker

This project uses [libarchivejs](https://github.com/nika-begiashvili/libarchivejs) for extracting compressed archives,
so you will need to provide the path of `webworker`:

> The webworker bundle lives in libarchive.js/dist folder so you need to make sure that it is available in your public folder since it will not get bundled if you're using bundler (it's all bundled up already)

```js
const workerUrl = 'path to ../build/worker-bundle.js',
```

### Formats

Supported archives formats by [`libarchive.js`](https://github.com/nika-begiashvili/libarchivejs)

- `ZIP`
- `7-Zip`
- `RAR v4`
- `RAR v5`
- `TAR`

## Usage

Import the component and the css styles

```js
// Component
import Villain from 'villain-react'

// Css styles
import 'villain-react/dist/style.css'

// Path of the comicbook archive, it can also be a file or blob
const url = './files/test.cbz'

// Path of the libarchivejs webworker bundle
const workerUrl = 'path to ../build/worker-bundle.js',

//...

<Villain source={url} options={opts} />
```

### Props

Available props of the component:

| Name      | Type               | Default                                               | Description                               |
| --------- | ------------------ | ----------------------------------------------------- | ----------------------------------------- |
| style     | Object             | null                                                  | Inline styles for root container.         |
| source    | string, file, blob | null                                                  | Path or file source of the archive.       |
| options   | object             | [options](https://github.com/btzr-io/Villain#options) | Options to customize the reader component |
| className | string             | null                                                  | Custom `css` class name                   |
| workerUrl | string             | null                                                  | Path to libarchive.js `worker-bundle`     |

### Options

Available options to customize the reader component:

| Name                 | Type   | Default | Description                                                                     |
| -------------------- | ------ | ------- | ------------------------------------------------------------------------------- |
| theme                | string | 'Light' | Choose CSS styling from between ('Light', 'Dark).                               |
| maxPages             | number | 500     | Max number of pages to extract and render.                                      |
| mangaMode            | bool   | false   | Read right to left.                                                             |
| forceSort            | bool   | true    | Fix sort order of pages ([#235](https://github.com/btzr-io/Villain/issues/235)) |
| allowFullScreen      | bool   | true    | Show full screen button.                                                        |
| autoHideControls     | bool   | false   | Set initial auto hide state of toolbar.                                         |
| allowGlobalShortcuts | bool   | false   | Allows shortcuts without having to focus the viewer.                            |

## Development

Run `yarn` command to install the dependencies.

To start the development run `yarn start`, this will open up `localhost:8080` on your default browser:

- This uses webpack-dev-server and includes hot-reloading.

An example archive has been provided to play around inside [`./packages/villain-react/dev-sandbox/static/archives`](https://github.com/xgirma/Villain/tree/master/packages/villain-react/dev-sandbox/static/archives)

- A good resource for archives can be found here: https://archive.org/details/comics.
- Alternative, any compressed folder (zip, rar, tar, etc) with a few images will also do the job.

## Known issues

- Accessibility issues [#23](https://github.com/btzr-io/Villain/issues/23)
- Some `.rar` and `.cbr` fail to load [#1](https://github.com/btzr-io/Villain/issues/1)
- Encrypted archived are not yet supported [#26](https://github.com/btzr-io/Villain/issues/26)

## Credits

- :hammer_and_wrench: Created and maintained by [@btzr-io](https://github.com/btzr-io) with the help of some awesome [contributors](https://github.com/btzr-io/Villain/graphs/contributors).

- :art: Logo and artworks designed by [@btzr-io](https://github.com/btzr-io), see [license](https://github.com/btzr-io/Villain/blob/master/artworks/ARTWORKS_LICENSE.md).
