import React from 'react'
import View from './view'

async function action() {
  return {
    title: 'embed',
    chunks: ['embed'],
    component: <View />,
  }
}

export default action
