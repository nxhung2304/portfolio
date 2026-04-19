import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/About.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../pages/Projects.vue')
    },
    {
      path: '/projects/:slug',
      name: 'project-detail',
      component: () => import('../pages/ProjectDetail.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../pages/Blog.vue')
    },
    {
      path: '/blog/:slug',
      name: 'blog-detail',
      component: () => import('../pages/BlogDetail.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../pages/Contact.vue')
    }
  ]
})

export default router
