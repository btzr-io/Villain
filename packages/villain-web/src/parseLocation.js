export default function parseLocation(location) {
  let path = location.hash ? location.hash.replace('#', '') : '/'
  let query = location.search

  if (!query) {
    const parts = path.split('?')
    path = parts[0]
    query = parts[1]
  }

  return { path, query }
}
