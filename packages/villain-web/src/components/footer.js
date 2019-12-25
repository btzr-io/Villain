import React from 'react'
import Icon from '@mdi/react'
import { mdiHeart } from '@mdi/js'

export default function Footer() {
  return (
    <footer>
        Made with{' '}
        <Icon
          className="footer__icon"
          aria-label="love"
          path={mdiHeart}
          size={0.72}
          color="#ff6b6b"
        />{' '}
        for the web, no trackers, no ads!
    </footer>
  )
}
