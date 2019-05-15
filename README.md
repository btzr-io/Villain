# Villain

An open source and touch friendly web based comic book reader.

## Usage

Import the component and the css styles

```JSX

import Villain from '../src/index.js'
import '../src/css/styles.css'
```

This component uses the [libarchivejs](https://github.com/nika-begiashvili/libarchivejs) for the extraction process,
so you will need to provide the path of `webworker`:

> The webworker bundle lives in libarchive.js/dist folder so you need to make sure that it is available in your public folder since it will not get bundled if you're using bundler (it's all bundled up already)


```JSX
const opts = {
  workerPath: '/build/worker-bundle.js',
  ...
}
```


```JSX
const url = '/files/test.cbz'

<Villain file={url} options={opts} />
```

```
