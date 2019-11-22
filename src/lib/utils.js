// Regex to detect image type
const regexImage = new RegExp(
  /^[a-zA-Z0-9_@()-][a-zA-Z0-9_.@()-\s]+.(jpeg|jpg|png|bpm|webp)$/
)

// Handle response status
const status = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

// Check if file is a valid image-type
export const isValidImageType = name => regexImage.test(name)

// Extract file MIME Type
export const getMimeType = name => {
  const mime = regexImage.exec(name)
  return `image/${mime ? mime[1] : 'jpeg'}`
}

// Load archive from server
export const fetchArchive = (url, callback, errorCallback) => {
  fetch(url, { mode: 'cors' })
    .then(status)
    .then(res => {
      // Get content-type
      const contentType = res.headers.get('Content-Type')
      return res.blob()
    })
    .then(callback)
    .catch(error => {
      errorCallback && errorCallback('Cant open archive')
      console.error('Request failed', error)
    })
}

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

export const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value)
}

export const debounce = (func, wait, immediate) => {
  let timeout
  return function() {
    const context = this,
      args = arguments
    const later = () => {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
