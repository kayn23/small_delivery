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
  },
  NewUsers: {
    Base: '/users',
    Index: '',
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
