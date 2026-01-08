const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DashboardPage.vue') },
      { path: '/componentes', component: () => import('pages/ComponentesPage.vue') },
      { path: '/auth/login', component: () => import('pages/LoginPage.vue') },
      { path: '/contratos', component: () => import('pages/ContratosPage.vue') },
      { path: '/user/profile', component: () => import('pages/UserProfile.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
