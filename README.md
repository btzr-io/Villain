<h1 align=center>
 <img align=center width="40%" src="https://user-images.githubusercontent.com/14793624/59959492-854cd400-9475-11e9-9149-4d21baa5591c.png" />
</h1>

<h2 align=center>
  <a href="https://david-dm.org/btzr-io/Villain" title="dependencies status">
    <img alt="npm" src="https://img.shields.io/npm/v/villain-react">
  </a>
  <a href="https://david-dm.org/btzr-io/Villain" title="dependencies status">
    <img src="https://david-dm.org/btzr-io/Villain/status.svg"/>
  </a>
  <a href="https://github.com/btzr-io/Villain/graphs/contributors">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/btzr-io/Villain.svg" alt="contributors">
  </a>
</h2>

<h4 align="center">
An open source web-based comic book reader.
</h4>

<br/>

## Installation

```SHELL
$ yarn add villain-react
```

## WebWorker

This component uses the [libarchivejs](https://github.com/nika-begiashvili/libarchivejs) for the extraction process,
so you will need to provide the path of `webworker`:

> The webworker bundle lives in libarchive.js/dist folder so you need to make sure that it is available in your public folder since it will not get bundled if you're using bundler (it's all bundled up already)

```JSX
const opts = {
  workerUrl: 'path to ../build/worker-bundle.js',
  ...
}
```

## Usage

Import the component and the css styles

```JSX
// Component
import Villain from 'villain-react'

// Css styles
import 'villain-react/dist/style.min.css'

// Path of the comicbook archive
const url = '/files/test.cbz'

//...

<Villain file={url} options={opts} />
```

## Options

Available options to customize the reader component:

| Name             | Type   | Default | Description                                                      |
| ---------------- | ------ | ------- | ---------------------------------------------------------------- |
| workerUrl        | string | null    | path to libarchive.js `worker-bundle`.                           |
| allowFullScreen  | bool   | true    | Show full screen button.                                         |
| autoHideControls | bool   | true    | Auto hide and show toolbar on `hover`, `focus` or `blur` events. |
| preview          | number | null    | Load only provided number of pages and show a preview label.     |

## Development

Run `yarn` command to install the dependencies.

To start the development run `yarn start`, this will open up `localhost:8080` on your default browser:

- This uses webpack-dev-server and includes hot-reloading.

An example archive has been provided to play around inside [`./build/testFile`](https://github.com/btzr-io/Villain/tree/master/build/testFile)

- A good resource for archives can be found here: https://archive.org/details/comics.
- Alternative, any compressed folder (zip, rar, tar, etc) with a few images will also do the job.

## Credits

- :hammer_and_wrench: Created and maintained by [@btzr-io](https://github.com/btzr-io) with the help of some awesome [contributors](https://github.com/btzr-io/Villain/graphs/contributors).

- :art: Logo and artworks designed by [@btzr-io](https://github.com/btzr-io), see [license](https://github.com/btzr-io/Villain/blob/master/ARTWORKS_LICENSE.md).
