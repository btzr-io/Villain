#!/usr/bin/env node
const { copyFileSync } = require('fs')

copyFileSync('./README.md', './docs/get-started.md')
copyFileSync('./packages/villain-web/README.md', './docs/villain-web.md')
copyFileSync('./packages/villain-react/README.md', './docs/villain-react.md')
