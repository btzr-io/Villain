import React from 'react'
import View from './view'

async function action() {
  return {
    title: 'React Starter Kit',
    chunks: ['home'],
    component: <View />,
  }
}

export default action
