import React from 'react'
import history from '@/history'
import parseLocation from '@/parseLocation'
import clsx from 'clsx'

import Icon from '@mdi/react'
import { mdiGithubCircle } from '@mdi/js'


const Routes = {
  '/reader': { name: 'Reader' },
  '/embed': { name: 'Embed API' },
}

const routesMap = Object.entries(Routes)

const Link = React.memo(({ active, href, children, className, hash }) => {
  return (
    <li>
      <a href={ hash ? '#' + href : href} className={clsx('link', active && 'link--active', className)}>
        {children}
      </a>
    </li>
  )
})

function Nav() {
  const { path } = React.useMemo(() => parseLocation(history.location), [
    history.location,
  ])
  return (
    <nav className="nav">
     <ul>
     <Link href={'/'}  className='link--main' hash>
     <img src="https://raw.githubusercontent.com/btzr-io/Villain/master/logo-text.svg?sanitize=true" className="header-logo"/>
     </Link>
     </ul>
      <ul>
        {routesMap.map(([route, data]) => (
          <Link href={route} active={route === path} key={route} hash>
            {data.name}
          </Link>
        ))}
        <Link href={'https://github.com/btzr-io/Villain'}>
        <Icon path={mdiGithubCircle} size={1.4} color={'currentColor'}  className='icon'/>
        </Link>
      </ul>
    </nav>
  )
}

export default React.memo(Nav)
