/**
 * Express router paths go here.
 */

function resourse(str: string = 'id') {
  return {
    Index: '',
    Show: `/:${str}`,
    Create: '',
    Update: `/:${str}`,
    Delete: `/:${str}`,
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
    ...resourse('invoice_id'),
    Cargoes: {
      Base: '/:invoice_id/cargoes',
      // Index: '/cargoes',
      ...resourse('cargo_id'),
    },
  },
  Status: {
    Base: '/statuses',
    Index: '',
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
  Role: {
    Base: '/roles',
    Index: '',
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
    ...resourse('cargo_id'),
  },
  Auth: {
    Base: '/',
    SignIn: '/signin',
  },
} as const
