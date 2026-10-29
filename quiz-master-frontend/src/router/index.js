import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const routes = [
  { path: '/', name: 'landing', component: () => import('../views/LandingView.vue') },
  { path: '/login', name: 'login', component: () => import('../views/auth/LoginView.vue') },
  { path: '/register', name: 'register', component: () => import('../views/auth/RegisterView.vue') },
  { path: '/feed', name: 'feed', component: () => import('../views/feed/FeedView.vue'), meta: { requiresAuth: true } },
  { path: '/profile', name: 'my-profile', component: () => import('../views/profile/MyProfileView.vue'), meta: { requiresAuth: true } },
  { path: '/profile/:username', name: 'public-profile', component: () => import('../views/profile/PublicProfileView.vue') },
  { path: '/my-quizzes', name: 'my-quizzes', component: () => import('../views/quiz/MyQuizzesView.vue'), meta: { requiresAuth: true } },
  { path: '/quiz/create', name: 'quiz-create', component: () => import('../views/quiz/QuizCreateView.vue'), meta: { requiresAuth: true } },
  { path: '/quiz/play/:id', name: 'quiz-play', component: () => import('../views/quiz/PlayQuizView.vue'), meta: { requiresAuth: true } },
  { path: '/quiz/:id', name: 'quiz-detail', component: () => import('../views/quiz/QuizDetailView.vue') },
  { path: '/quiz/:id/edit', name: 'quiz-edit', component: () => import('../views/quiz/QuizEditView.vue'), meta: { requiresAuth: true } },
  { path: '/themes', name: 'themes', component: () => import('../views/theme/ThemeListView.vue'), meta: { requiresAuth: true } },
  { path: '/liked-quizzes', name: 'liked-quizzes', component: () => import('../views/LikedVideosView.vue'), meta: { requiresAuth: true } },
  { path: '/admin', name: 'admin-dashboard', component: () => import('../views/admin/AdminDashboardView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/quizzes', name: 'admin-quizzes', component: () => import('../views/admin/AdminQuizzesView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/admin/users', name: 'admin-users', component: () => import('../views/admin/AdminUsersView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const { isAuthenticated } = useAuth()

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router