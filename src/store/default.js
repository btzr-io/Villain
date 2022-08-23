import { READY_STATE, READ_MODE, LAYOUT_MODE } from "@/constants";

export const initialOptions = {
  loop: false,
  play: false,
  playbackInterval: 6,
  layout: LAYOUT_MODE.PAGE,
  readMode: READ_MODE.DEFAULT,
  mangaMode: false,
  language: "EN",
};

export const initialState = {
  id: null,
  title: false,
  pages: [],
  error: null,
  options: initialOptions,
  progress: 0.0,
  password: null,
  totalPages: 0,
  encrypted: false,
  readyState: READY_STATE.NOTHING,
  currentPage: 0,
  currentPages: [],
};
