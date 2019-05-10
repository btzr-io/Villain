// Regex to detect image type
const regexImage = new RegExp('^.+.(jpeg|jpg|png|bpm|webp|gif)$')

// Check if file is a valid image-type
export const isValidImageType = name => regexImage.test(name)

// Extract file MIME Type
export const getMimeType = name => {
  const mime = regexImage.exec(name)
  return `image/${mime ? mime[1] : 'jpeg'}`
}

// Handle response status
const status = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

// Load archive from server
export const fetchArchive = (url, callback) => {
  fetch(url, { mode: 'cors' })
    .then(status)
    .then(res => {
      // Get content-type
      const contentType = res.headers.get('Content-Type')
      return res.blob()
    })
    .then(callback)
    .catch(error => {
      console.error('Request failed', error)
    })
}
