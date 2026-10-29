<script setup>
import { ref, onMounted } from 'vue'
import { getLikedQuizzes } from '../services/likeService'
import QuizCard from '../components/quiz/QuizCard.vue'

const quizzes = ref([])
const isLoading = ref(true)
const apiErrorMessage = ref('')

onMounted(async () => {
    try {
        const response = await getLikedQuizzes()
        quizzes.value = response.data
    } catch (error) {
        apiErrorMessage.value = error.message
    } finally {
        isLoading.value = false
    }
})
</script>

<template>
    <div>
        <h4 class="fw-bold mb-4">Quizzes Curtidos</h4>

        <p v-if="isLoading" class="text-center text-muted">Carregando...</p>
        <p v-else-if="apiErrorMessage" class="text-danger text-center">{{ apiErrorMessage }}</p>

        <template v-else>
            <div v-if="quizzes.length === 0" class="alert alert-info text-center">
                Você ainda não curtiu nenhum quiz.
                <router-link :to="{ name: 'feed' }">Explore o Feed</router-link>.
            </div>

            <div v-else class="row g-4">
                <div v-for="quiz in quizzes" :key="quiz.id" class="col-6 col-md-4 col-lg-3">
                    <QuizCard :quiz="quiz" />
                </div>
            </div>
        </template>
    </div>
</template>