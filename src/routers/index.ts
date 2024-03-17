export interface OptionalRoute {
  path: string
  componentName: string
  status?: number
  privateRouter: boolean
}
export const routes: OptionalRoute[] = [
  {
    path: '/',
    componentName: 'HomePage',
    privateRouter: false
  },
  // The NotFoundPage is a catch-all and nothing should be below it.
  {
    path: '*',
    componentName: 'NotFoundPage',
    status: 404,
    privateRouter: false
  }
]
