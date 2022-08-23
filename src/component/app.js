import React, { Fragment, useState } from "react";
import Viewer from "@/component/viewer";
import clsx from "clsx";

import {
  usePages,
  useLoader,
  useEncrypted,
  useNavigation,
  useReadyState,
  useCore,
} from "@/hooks";

import { READY_STATE } from "@/constants";

const TEST_URL = "http://localhost:8080/example_2.cbz";
const TEST_ENCRYPTED = "http://localhost:8080/encrypted.zip";

let TEST_ARRAY = ["./Apple.png", "/Banana.jpg", "./Apple.png", "/Banana.jpg"];

function App({ source, options }) {
  const [id] = useCore();

  const { progress } = useLoader({
    maxPages: 1000,
    forceSort: true,
    source: TEST_URL,
    workerUrl: "webworker/worker-bundle.js",
  });

  const { pages } = usePages();
  const { encrypted, password, setPassword } = useEncrypted();
  const {
    totalPages,
    currentPage,
    currentPageNumber,
    forward,
    back,
    last,
    first,
    canForward,
    canBack,
  } = useNavigation();

  const readyState = useReadyState();

  React.useEffect(() => {
    if (readyState === READY_STATE.REQUESTING_PASSWORD) {
      if (encrypted && !password) {
        setPassword(
          prompt(
            "The archive is password protected. Please enter the password:"
          )
        );
      }
    }
  }, [encrypted, password, readyState]);

  return (
    <div id={id} className={"villain-viewer"} aria-label="Comicbook viewer">
      {pages && pages.length ? <Viewer pages={pages} /> : null}
    </div>
  );
}

export default App;
