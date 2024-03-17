import { OptionalRoute, routes } from './index'

import loadable from '@loadable/component'
import { retry } from '../helpers'
import * as React from 'react'
import { useLocation, useParams, useRoutes } from 'react-router-dom'

interface PartialRouteObject {
  caseSensitive?: boolean
  children?: PartialRouteObject[]
  element: React.ReactNode
  path: string
}
interface AsyncComponentProps {
  name: string
  privateRouter: boolean
}

const AsyncComponent: React.FC<AsyncComponentProps> = ({
  name,
  ...props
}) => {
  const location = useLocation()
  const params = useParams()
  const Component = loadable(
    () => retry(() => import(`../pages/${name}.tsx`))
  )

  return (
    <Component
      {...props}
      match={{ params }}
      location={location}
    />
  )
}

const generateRoutes = (
  routes: OptionalRoute[],
): PartialRouteObject[] => {
  return routes.map(({
    path,
    componentName,
    privateRouter = false
  }) => {
    return {
      element: (
        <AsyncComponent
          name={componentName}
          privateRouter={privateRouter}
        />
      ),
      path
    }
  }
  )
}

export default function RenderRouter () {
  return useRoutes([
    ...generateRoutes(routes)
  ])
}
