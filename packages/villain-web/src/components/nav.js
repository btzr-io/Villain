import React from 'react'
import history from '@/history'
import parseLocation from '@/parseLocation'
import clsx from 'clsx'

const Routes = {
  '/': { name: 'Home' },
  '/reader': { name: 'Reader' },
  '/embed': { name: 'Embed API' },
}

const routesMap = Object.entries(Routes)

const Link = React.memo(({ active, href, children }) => {
  return (
    <li>
      <a href={'#' + href} className={clsx('link', active && 'link--active')}>
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
        {routesMap.map(([route, data]) => (
          <Link href={route} active={route === path} key={route}>
            {data.name}
          </Link>
        ))}
      </ul>
    </nav>
  )
}

export default React.memo(Nav)
