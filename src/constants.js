export const LANGUAGES = {
  EN: "English",
  ES: "Español",
  DE: "Deutsch",
  FR: "Français",
  PT: "Português",
  ID: "Bahasa Indonesia",
  RU: "Русский",
  ZH: "話僮",
  KO: "한국어",
};

export const FILE_TYPES = [
  // Comicboock archive file extensions
  "cb7",
  "cbr",
  "cbt",
  "cbz",
  // Archive file extensions
  "7z",
  "rar",
  "tar",
  "zip",
];

export const IMAGE_TYPES = ["png", "jpg", "jpeg", "webp"];

export const READ_MODE = {
  MANGA: "RIGHT_TO_LEFT",
  DEFAULT: "LEFT_TO_RIGHT",
};

export const LAYOUT_MODE = {
  PAGE: 1,
  BOOK: 2,
};

export const READY_STATE = {
  // There is no archive or source to load
  NOTHING: 0,
  // Fetching archive from the web
  LOADING_ARCHIVE: 1,
  // Find all data to unpack
  READING_ARCHIVE: 2,
  // Unpack images and create pages
  UNPACKING_ARCHIVE: 3,
  // All pages where created
  READY: 4,
  // An error ocurred, the `error` property on the global store will contain more info
  ERROR: 5,
  // Archive is encrypted and requires a password
  REQUESTING_PASSWORD: 6,
  // Password was provided, decryptation is in progress
  DECRYPTING_ARCHIVE: 7,
};

export const ACTION_TYPE = {
  SET_ID: "SET_ID",
  ADD_PAGE: "ADD_PAGE",
  SET_PAGE: "SET_PAGE",
  SET_LAYOUT: "SET_LAYOUT",
  CLEAR_STATE: "CLEAR_STATE",
  THROW_ERROR: "THROW_ERROR",
  SET_PASSWORD: "SET_PASSWORD",
  REQUEST_PASSWORD: "REQUEST_PASSWORD",
  UPDATE_STATE: "UPDATE_STATE",
  UPDATE_OPTIONS: "UPDATE_OPTIONS",
  UPDATE_READY_STATE: "UPDATE_READY_STATE",
};

export const ERROR_MESSAGE = {};
