# Villain

<img width="54%" src="https://user-images.githubusercontent.com/14793624/57827036-002e1b00-7763-11e9-8b59-1a6c8abcdbe1.png" />


An open source and touch friendly web based comic book reader.



## Installation

```SHELL
$ yarn add btzr-io/Villain/
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

```
