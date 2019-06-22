<h1 align=center>
 <img width="32%" src="https://user-images.githubusercontent.com/14793624/59959492-854cd400-9475-11e9-9149-4d21baa5591c.png" />
</h1>

<h2 align=center>
  <a href="https://david-dm.org/btzr-io/Villain" title="dependencies status">
    <img src="https://david-dm.org/btzr-io/Villain/status.svg"/>
  </a>
  <a href="https://github.com/btzr-io/Villain/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/btzr-io/Villain.svg" alt="license"  />
  </a>
  <a href="https://github.com/btzr-io/Villain/graphs/contributors">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/btzr-io/Villain.svg" alt="contributors">
  </a>
</h2>

<h4 align="center">
An open source and touch friendly web based comic book reader.
</h4>

<br/>

## Installation

```SHELL
$ yarn add btzr-io/Villain
```

## WebWorker

This component uses the [libarchivejs](https://github.com/nika-begiashvili/libarchivejs) for the extraction process,
so you will need to provide the path of `webworker`:

> The webworker bundle lives in libarchive.js/dist folder so you need to make sure that it is available in your public folder since it will not get bundled if you're using bundler (it's all bundled up already)


```JSX
const opts = {
  workerPath: 'villain/build/worker-bundle.js',
  ...
}
```
## Usage

Import the component and the css styles

```JSX
// Component
import Villain from 'villain'

// Css styles
import 'villain/dist/style.min.css'

// Path of the comicbook archive
const url = '/files/test.cbz'

//...

<Villain file={url} options={opts} />
```

## Options

Available options to customize the reader component:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| workerPath | string | null | path to libarchive.js `worker-bundle`. |
| allowFullScreen | bool | true |  Show full screen button. |
| autoHideControls | bool | true | Auto hide and show toolbar on `hover`, `focus` or `blur` events. |
