/**
 * Express router paths go here.
 */

function resourse() {
  return {
    Index: '',
    Show: '/:id',
    Create: '',
    Update: '/:id',
    Delete: '/:id',
  }
}
interface IPaths {
  [key: string]: IPaths | string
}
function subRoute(config: IPaths) {
  return {
    Base: '/:id',
    ...config,
  }
}

export default {
  Base: '/api',
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Invoice: {
    Base: '/invoices',
    ...resourse(),
    Cargoes: {
      Base: '/:id',
      Index: '/cargoes',
    },
  },
  NewUsers: {
    Base: '/users',
    Index: '',
    All: '/users_all',
    Show: '/:id',
    Create: '',
    Update: '/:id',
    Delete: '/:id',
  },
  Stock: {
    Base: '/stocks',
    Index: '',
    Show: '/:id',
    Create: '',
    Update: '/:id',
    Delete: '/:id',
  },
  City: {
    Base: '/cities',
    ...resourse(),
  },
  Cargo: {
    Base: '/cargoes',
    ...resourse(),
  },
  Auth: {
    Base: '/',
    SignIn: '/signin',
  },
} as const
