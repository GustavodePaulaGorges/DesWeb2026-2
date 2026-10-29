<script setup>
import { computed } from 'vue'
import { useAuth } from '../../composables/useAuth'

const { isAuthenticated, currentUser } = useAuth()

const publicRoutes = [
    { label: 'Início', to: '/', icon: 'bi-house-door-fill', group: 'Geral' },
]

const authRoutes = [
    { label: 'Para você', to: '/feed', icon: 'bi-house-door-fill', group: 'Geral' },
    { label: 'Temas', to: '/themes', icon: 'bi-compass', group: 'Quiz' },
    { label: 'Meus quizzes', to: '/my-quizzes', icon: 'bi bi-puzzle-fill', group: 'Quiz' },
    { label: 'Quizzes curtidos', to: { name: 'liked-quizzes' }, icon: 'bi-heart', group: 'Quiz' },
    { label: 'Criar quiz', to: '/quiz/create', icon: 'bi-plus-square', group: 'Quiz' },
]

const navigationGroups = computed(() => {
    const visibleRoutes = isAuthenticated.value
        ? [...publicRoutes, ...authRoutes]
        : publicRoutes
    const groups = new Map()

    visibleRoutes.forEach(item => {
        if (!groups.has(item.group)) groups.set(item.group, [])
        groups.get(item.group).push(item)
    })

    return [...groups].map(([name, items]) => ({ name, items }))
})

</script>

<template>
    <aside class="col-md-3 col-lg-2 d-none d-md-block sidebar py-4">
        <nav class="nav flex-column">
            <section v-for="group in navigationGroups" :key="group.name" class="nav-group">
                <h2 class="small text-muted px-3 mb-2">{{ group.name }}</h2>
                <ul class="list-unstyled mb-0">
                    <li v-for="item in group.items" :key="item.label">
                        <router-link :to="item.to" class="nav-link">
                            <i :class="['bi', item.icon, 'me-2']"></i>
                            {{ item.label }}
                        </router-link>
                    </li>
                </ul>
            </section>

            <template v-if="currentUser?.isAdmin">
                <hr />
                <h2 class="small text-muted px-3 mb-2">Administração</h2>
                <router-link to="/admin" class="nav-link">
                    <i class="bi bi-speedometer2 me-2"></i>
                    Dashboard Admin
                </router-link>
                <router-link to="/admin/quizzes" class="nav-link">
                    <i class="bi bi-ui-checks-grid me-2"></i>
                    Quizzes
                </router-link>
                <router-link to="/admin/users" class="nav-link">
                    <i class="bi bi-people me-2"></i>
                    Usuários
                </router-link>
            </template>
        </nav>
    </aside>
</template>
