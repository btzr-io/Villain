import React, { useRef, useEffect, useContext } from "react";
import { store } from "@/store";
import { Archive } from "libarchive.js/main.js";
import { ACTION_TYPE, READY_STATE } from "@/constants";
import {
  fetchArchive,
  asyncForEach,
  sortByName,
  isValidImageType,
  getFileNameFromUrl,
} from "@/utils";

function useLoader({ source, workerUrl, maxPages, forceSort = true }) {
  /*
   * -- Global State --
   */
  const archive = useRef(null);
  const { state, dispatch, updateState } = useContext(store);
  const { title, progress, encrypted, password, readyState } = state;
  /*
   * -- Store Actions --
   */

  const addPage = (payload) => {
    dispatch({ type: ACTION_TYPE.ADD_PAGE, payload });
  };

  const clearState = () => {
    dispatch({ type: ACTION_TYPE.CLEAR_STATE });
  };

  const throwError = (payload) => {
    dispatch({ type: ACTION_TYPE.THROW_ERROR, payload });
  };

  const updateReadyState = (payload) => {
    dispatch({ type: ACTION_TYPE.UPDATE_READY_STATE, payload });
  };

  const requestPassword = () => {
    dispatch({ type: ACTION_TYPE.REQUEST_PASSWORD });
  };

  /*
   * -- Event handlers  --
   */

  const handleError = (error) => {
    throwError(error);
    console.error(error);
  };

  const handleCompressedFile = async (compressedFile, index) => {
    const file = await compressedFile.file.extract();
    const { name } = file;
    const url = URL.createObjectURL(file);
    const page = { index, url, name, type: "image", buildPyramid: false };
    // Save page in the global store
    addPage(page);
  };

  const asyncPage = (url, index) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const name = getFileNameFromUrl(url);
        const page = { index, url, name, type: "image", buildPyramid: false };
        resolve(page);
      }, 1);
    });

  const handleImageUrl = async (url, index) => {
    const page = await asyncPage(url, index);
    addPage(page);
  };

  const handleDestroy = () => {
    // Release memory
    if (state.pages.length > 0) {
      state.pages.forEach((page) => {
        URL.revokeObjectURL(page.url);
      });
    }
    // Free up memory
    if (archive.current) {
      // Terminate webworker
      if (archive.current._worker) {
        archive.current._worker.terminate();
        archive.current._worker = null;
      }
      // Clear archive instance
      archive.current = null;
    }
    // Clear global state
    clearState();
  };

  /*
   * -- libarchiveJS --
   */

  const extract = async () => {
    try {
      // Update ready state
      updateReadyState(READY_STATE.READING_ARCHIVE);
      // Get archive files
      const compressedFiles = await archive.current.getFilesArray();
      // Find images on archive
      let compressedImages = compressedFiles.filter(({ file, path }) => {
        return isValidImageType(file.name, path);
      });
      // Sometimes files will require sorting:
      // See: https://github.com/btzr-io/Villain/issues/235
      if (forceSort && compressedImages.length > 1) {
        compressedImages.sort(sortByName);
      }
      // Max limit of images to decompress
      if (maxPages && maxPages < compressedImages.length) {
        compressedImages = compressedImages.splice(0, maxPages);
      }

      updateState((prevState) => ({ totalPages: compressedImages.length }));

      if (compressedImages && compressedImages.length) {
        // Uncompress imgages
        await asyncForEach(compressedImages, handleCompressedFile);
      } else {
        handleError("Cant open archive");
      }
    } catch (err) {
      // Handle Errors
      handleError(err);
    }
  };

  const decrypt = async (password) => {
    try {
      // Update ready state
      if (password) {
        let decrypted = await archive.current.usePassword(password);
        if (decrypted === true) {
          // Start extraction
          extract();
        } else {
          // Decryptation failed
          handleError("Invalid password:", decrypted);
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

  const loadArchiveFromUrl = (url) => {
    fetchArchive(url, openArchive, handleError);
    updateReadyState(READY_STATE.LOADING_ARCHIVE);
  };

  const loadArchiveFromBlob = (blob) => {
    openArchive(blob);
  };

  const loadFromArray = async (list) => {
    let images = list;
    if (images && images.length > 0) {
      if (forceSort && images.length > 1) {
        images.sort();
      }
      if (maxPages && maxPages < images.length) {
        images = images.splice(0, maxPages);
      }
      // Update ready state
      updateReadyState(READY_STATE.READING_ARCHIVE);
      // Update total pages
      updateState((prevState) => ({ totalPages: images.length }));

      await asyncForEach(images, handleImageUrl);
    }
  };

  const openArchive = async (archiveFile) => {
    // Open archive
    archive.current = await Archive.open(archiveFile);
    // Check for encrypted data
    const encrypted = await archive.current.hasEncryptedData();
    if (encrypted) {
      requestPassword();
    } else {
      extract();
    }
  };

  useEffect(() => {
    handleDestroy();
    if (!Archive._options) {
      Archive.init({ workerUrl });
    }
    // Destroy archive instance and clear state
    return handleDestroy;
  }, []);

  // Reset state if source changed
  useEffect(clearState, [source]);

  // Decryptation
  useEffect(() => {
    if (readyState === READY_STATE.DECRYPTING_ARCHIVE) {
      if (encrypted && password) {
        decrypt(password);
      }
    }
  }, [encrypted, password, readyState]);

  useEffect(() => {
    // Empty source
    if (!source || readyState !== READY_STATE.NOTHING) return;
    // Loading archive from url
    if (typeof source === "string") {
      // Load archive from valid source
      loadArchiveFromUrl(source);
    }
    // Loading archive from blob or file
    if (source instanceof Blob) {
      loadArchiveFromBlob(source);
    }

    // Load images from array
    if (Array.isArray(source)) {
      loadFromArray(source);
    }
  }, [source, readyState]);

  return { title, source, archive, progress };
}

export default useLoader;
