import React from 'react'
import { ReaderContext } from '@/context'

// Renderless component to sync props with context state
const OptionsConsumer = React.memo(({ options }) => {
  const context = React.useContext(ReaderContext)
  // Update context state on props change
  React.useEffect(() => {
    Object.entries(options).map(([key, value]) => {
      if (context[key] !== value) {
        context.updateState({ [key]: value })
      }
    })
  }, [options])
  // Nothing to render
  return null
})

export default OptionsConsumer
