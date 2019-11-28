import React from 'react'
import Icon from '@mdi/react'
import Localized from '@/components/localized'

const Error = React.memo(props => {
  const { icon, message } = props
  return (
    <div className={'villain-overlay villain-overlay--canvas'}>
      <Icon className={'villain-icon'} path={icon} size={3} />
      <div className={'villain-overlay--message'}>
        <h3>
          <Localized value={message} />
        </h3>
      </div>
    </div>
  )
})

export default Error
