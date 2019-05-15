# Villain

An open source and touch friendly web based comic book reader.

## Usage

```JSX

import Villain from '../src/index.js'
import '../src/css/styles.css'
```

```JSX
const opts = {
  workerPath: '/build/worker-bundle.js',
}
```

```JSX
const url = '/files/test.cbz'

<Villain file={url} options={opts} />
```

```
