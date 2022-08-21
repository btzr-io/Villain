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
 <a href="https://opencollective.com/villain">
  <img alt="Open Collective sponsors" src="https://img.shields.io/opencollective/sponsors/villain">
 </a>
<a href="https://github.com/btzr-io/Villain/graphs/contributors">
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/btzr-io/Villain.svg" alt="contributors">
 </a>
 <a href="https://github.com/btzr-io/Villain/blob/master/LICENSE">
  <img alt="GitHub license" src="https://img.shields.io/github/license/btzr-io/Villain">
 </a>
  <a href="https://github.com/lerna/lerna">
 <img alt="Lerna" src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg">
 </a>
</h3>
<br/>
<h3 align="center">
 <img alt="Screen preview" src="https://raw.githubusercontent.com/btzr-io/Villain/master/artworks/Screenshot_2019-11-27%20Villain%20Demo.png">
</h3>

## What?

A simple open source web-based reader for:

- Manga
- Comic books
- Graphic novels
- Illustrated books

Works on the client side and is easy to integrate on any modern website or react application.

## How?

It relays on cutting-edge web apis and frameworks like react, webworkers and webAssembly:

- Dont expect it to work on a hot potato
- Usage with modern browsers is recommended

## Features

- Dark / light theme
- Manga mode ( Read right to left or default left to right )
- Full screen mode ( Browser fullscreen API integration )
- Easy page navigation : prev / next page buttons, slider component as well and a text input for accessibility
- Keyboard shortcuts ( I need to document this )
- Localization of strings ( Multi language support for the UI )
- Layout mode : Single page / Book ( two pages )

A killer feature is missing ? Open a [feature request](https://github.com/btzr-io/Villain/issues/new?assignees=&labels=&template=feature_request.md&title=)

## Formats

Supported archives formats by [`libarchive.js`](https://github.com/nika-begiashvili/libarchivejs)

- `ZIP`
- `7-Zip`
- `RAR v4`
- `RAR v5`
- `TAR`

## Development:

Before you jump in the code please follow the initial setup guide for development:

1. Clone or fork this repository.
2. Run `yarn` command to install the project dependencies.

That's it! Now you are ready to start fixing bugs and implementing new features. :tada:


### Commands

Available package scripts for development:

| Name          | Description                                                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| deploy        | Deploy [villain-web](https://github.com/btzr-io/Villain/tree/master/packages/villain-web) to github pages                                               |

```sh
yarn command-name
```

## Known issues

- Accessibility issues [#23](https://github.com/btzr-io/Villain/issues/23)
- Some `.rar` and `.cbr` fail to load [#1](https://github.com/btzr-io/Villain/issues/1)
- Encrypted archived are not yet supported [#26](https://github.com/btzr-io/Villain/issues/26)

## Credits

- :hammer_and_wrench: Created and maintained by [@btzr-io](https://github.com/btzr-io) with the help of some awesome [contributors](https://github.com/btzr-io/Villain/graphs/contributors).

- :art: Logo and artworks designed by [@btzr-io](https://github.com/btzr-io), see [license](https://github.com/btzr-io/Villain/blob/master/artworks/ARTWORKS_LICENSE.md).
