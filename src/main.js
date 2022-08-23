import React from 'react'
import { StateProvider } from '@/store'
import * as hooks from '@/hooks'
import App from '@/component/app'

export const Hooks = hooks
export const VillainSDK = StateProvider

export const Villain = ({ src, options }) => {
  return (
    <StateProvider>
      <App source={src} options={options} />
    </StateProvider>
  )
}
