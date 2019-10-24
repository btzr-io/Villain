import React from 'react'
import Icon from '@mdi/react'

import { mdiClose, mdiGithubCircle } from '@mdi/js'
import { version } from '../../../package.json'

import './modal.css'

export const InfoModal = ({ toggleInfoModal }) => (
  <div className="modal__overlay">
    <div className="modal__content">
      <Icon
        path={mdiClose}
        className="modal__icon"
        color="rgb(255, 239, 127)"
        onClick={toggleInfoModal}
      />
      <img src="./logo.png" alt="Villain logo" />
      <span className="modal__version">{`v ${version}`}</span>
      <span className="modal__description">
        An open source web-based comic book reader.
      </span>
      <Icon
        path={mdiGithubCircle}
        className="modal__github"
        color="rgb(255, 239, 127)"
        onClick={() => {
          window.open('https://github.com/btzr-io/Villain').focus()
        }}
        size="42px"
      />
    </div>
  </div>
)
