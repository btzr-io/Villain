import React from 'react'
import Reader from '@/components/reader'

async function action({}) {
  return {
    title: 'Reader',
    chunks: ['reader'],
    component: <Reader />,
  }
}

export default action
