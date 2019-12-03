import React from 'react'
import Reader from '@/components/reader'
import Landing from '@/components/landing'

function App({ context, children }) {
  const [file, setFile] = React.useState(null)
  const [source, setSource] = React.useState(null)
  const handleFileChange = e => {
    setFile(e.target.files[0])
  }

  // Update source
  React.useEffect(() => {
    setSource(context.src || file)
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
