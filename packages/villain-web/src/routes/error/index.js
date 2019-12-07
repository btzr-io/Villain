import React from 'react'
import View from './view'

async function action() {
  return {
    title: 'error',
    chunks: ['error'],
    component: <View />,
  }
}

export default action
