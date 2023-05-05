import permission from './permission'
export default function useDirectives(app) {
  app.directive('permission', permission)
}
