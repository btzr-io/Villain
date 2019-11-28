import React from 'react'
import { ReaderContext } from '@/context'
import Localize from '@/localize'

const Localized = React.memo(({ value, language }) => Localize[value])

const LocalizedConsumer = React.memo(({ value }) => {
  const { language } = React.useContext(ReaderContext)
  return <Localized value={value} language={language} />
})

export default LocalizedConsumer
