# Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## [1.0.8] - [2019-12-04]

### Added

- Option to force sorting order [(#237)](https://github.com/btzr-io/Villain/issues/237)

### Fixed

- Wrong sort order on some archives [(#235)](https://github.com/btzr-io/Villain/issues/235)

## [1.0.7] - [2019-11-27]

### Changed

- Rename "file" prop to "source" [(See commit)](https://github.com/btzr-io/Villain/commit/cc59bfa8ec82ee090b4ccd3e427aa1eebad570cd)

### Fixed

- Worker is not terminated [(228)](https://github.com/btzr-io/Villain/issues/228)
- Incorrect target zoom on book mode [(See commit)](https://github.com/btzr-io/Villain/commit/8419754b36a43ad46c921238eeeb50420c844e0c)
- Use more inclusive regexp for matching file paths [(#227)](https://github.com/btzr-io/Villain/issues/227)
- Can't render more than one instance of the component [(#229)](https://github.com/btzr-io/Villain/issues/229)

## [1.0.6] - [2019-11-24]

### Added

- Style prop to pass in-line styles to the main container [(See commit)](https://github.com/btzr-io/Villain/commit/8fbfa0d2a7d5bda3bcb713c80efd9a769bd0ef8f)

### Changed

- Minor css changes [(See commit)](https://github.com/btzr-io/Villain/commit/132825d32dd09b0b2852f201cb95c374fe68b41c)

### Fixed

- Minor patch for electron [(See commit)](https://github.com/btzr-io/Villain/commit/132825d32dd09b0b2852f201cb95c374fe68b41c)
  - Fix css issues on electron
  - Fix menu height not updating on electron

## [1.0.5] - [2019-11-23]

### Fixed

- Fix scss styles not build on bundle [(See commit)](https://github.com/btzr-io/Villain/commit/e73fee8c762a9f571c986524d69c5c3629d6fc00)

## [1.0.4] - [2019-11-23]

### Changed

- Update build

## [1.0.3] - [2019-11-23]

### Added

- New `maxPages` prop [(See commit)](https://github.com/btzr-io/Villain/commit/8fbfa0d2a7d5bda3bcb713c80efd9a769bd0ef8f)

### Changed

- Improve toolbar auto-hide behavior [(See commit)](https://github.com/btzr-io/Villain/commit/146f50f323d44c3d732219c13f01b46449f945de)
- Better opacity for disabled buttons [(See commit)](https://github.com/btzr-io/Villain/commit/4d592a7f8e5abe4436f7adaa684d43cf23139cf8)
- Remove deprecated preview mode [(See commit)](https://github.com/btzr-io/Villain/commit/8fbfa0d2a7d5bda3bcb713c80efd9a769bd0ef8f)

## [1.0.2] - [2019-11-21]

### Added

- Basic animations [(#213)](https://github.com/btzr-io/Villain/issues/213)

### Changed

- Render improvements [(#219)](https://github.com/btzr-io/Villain/issues/219)

### Fixed

- Localization not updating strings [(See commit)](https://github.com/btzr-io/Villain/commit/06a9831761c4599991033e55a24a15be2b086e1a)
- Reverse mode (manga) is not optimized [(#221)](https://github.com/Villain/issues/221)
- Can't properly fit pages to viewer bounds (book mode) [(#132)](https://github.com/btzr-io/Villain/issues/132)
- Performance issues on Focus / blur event listener [(#220)](https://github.com/btzr-io/Villain/issues/220)

## [1.0.1] - [2019-11-12]

### Added

- New files of project's logo [(#180)](https://github.com/btzr-io/Villain/issues/180)

### Changed

- Css styles refactoring [(#140)](https://github.com/btzr-io/Villain/issues/140):
  - Add `villain` prefix to css styles
  - Better naming convention for css classes

## [1.0.0] - [2019-11-11]

### Added

- Localization [(#76)](https://github.com/btzr-io/Villain/issues/76)
- Menu (options) [(#13)](<(https://github.com/btzr-io/Villain/issues/13)>)
- Dark and light theme [(#15)](https://github.com/btzr-io/Villain/issues/15)
- Theme toggler [(#14)](https://github.com/btzr-io/Villain/issues/14)
- Keyboard navigation for slider component [(#39)](https://github.com/btzr-io/Villain/issues/39)
- Preview mode [(#27)](https://github.com/btzr-io/Villain/issues/27)
- Manga mode [(#10)](https://github.com/btzr-io/Villain/issues/10)
- Keyboard shortcuts [(#20)](https://github.com/btzr-io/Villain/issues/20)
- Load archive from file object [(#129)](https://github.com/btzr-io/Villain/issues/129)
- Aria-labels and roles to buttons and inputs [(#84)](https://github.com/btzr-io/Villain/issues/84)
- Keyboard navigation for slider component [(#39)](https://github.com/btzr-io/Villain/issues/39)

### Fixed

- Slider component skipped key tab [(#40)](https://github.com/btzr-io/Villain/issues/40)
- Improve image type validation [(#50)](https://github.com/btzr-io/Villain/issues/50)
- Unified tooltip [(#93)](https://github.com/btzr-io/Villain/issues/93)

### Changed

- Reduce module size [(#60)](https://github.com/btzr-io/Villain/issues/60)
- Implement reakit [(#165)](https://github.com/btzr-io/Villain/issues/165)
- Renamed workerPath option to workerUrl [(#55)](https://github.com/btzr-io/Villain/issues/55)
- Move react/react-dom deps into `peerDependencies` [(#155)](https://github.com/btzr-io/Villain/issues/155)
- Split main css into different files for each component [(#99)](https://github.com/btzr-io/Villain/issues/99)

## [0.0.9] - [2019-10-15]

### Fixed

- Bad zoom levels [(#3)](https://github.com/btzr-io/Villain/issues/3)
- Fullscreen mode not working [(#11)](https://github.com/btzr-io/Villain/issues/11)
- Change fullscreen icon on enter and exit events [(#17)](https://github.com/btzr-io/Villain/issues/17)

### Changed

- Update libarchive.js [(#28)](https://github.com/btzr-io/Villain/issues/28)
