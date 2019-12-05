import React from 'react'
import Reader from '@/components/reader'
import Landing from '@/components/landing'

function App({ context, children }) {
  const [file, setFile] = React.useState(null)
  const [source, setSource] = React.useState(context.query.src)

  const handleFileChange = React.useCallback(files => {
    setFile(files[0])
  })

  // Update source
  React.useEffect(() => {
    setSource(context.query.src || file)
  }, [file, context])

  return (
    <React.Fragment>
      {!source ? (
        <Landing handleFileChange={handleFileChange} />
      ) : (
        <Reader source={source} />
      )}
    </React.Fragment>
  )
}

export default React.memo(App)
