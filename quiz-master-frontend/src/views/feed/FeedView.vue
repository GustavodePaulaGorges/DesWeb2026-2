<script setup>
import { ref, onMounted } from 'vue'
import { getFeed } from '../../services/userService'
import QuizCard from '../../components/quiz/QuizCard.vue'
import BaseButton from '../../components/base/BaseButton.vue'

const LIMIT = 12

const quizzes = ref([])
const page = ref(1)
const hasMore = ref(true)

const isLoading = ref(true)
const isLoadingMore = ref(false)
const apiErrorMessage = ref('')

async function loadFeed() {
    isLoading.value = true
    apiErrorMessage.value = ''

    try {
        const response = await getFeed(page.value, LIMIT)
        quizzes.value = response.data
        hasMore.value = response.data.length === LIMIT
    } catch (error) {
        apiErrorMessage.value = error.message
    } finally {
        isLoading.value = false
    }
}

async function loadMore() {
    isLoadingMore.value = true
    const nextPage = page.value + 1

    try {
        const response = await getFeed(nextPage, LIMIT)
        quizzes.value = [...quizzes.value, ...response.data]
        hasMore.value = response.data.length === LIMIT
        page.value = nextPage
    } catch (error) {
        apiErrorMessage.value = error.message
    } finally {
        isLoadingMore.value = false
    }
}

onMounted(loadFeed)
</script>

<template>
    <div>
        <h4 class="fw-bold mb-4">Feed</h4>

        <p v-if="isLoading" class="text-center text-muted">Carregando...</p>
        <p v-else-if="apiErrorMessage && quizzes.length === 0" class="text-danger text-center">{{ apiErrorMessage }}
        </p>

        <template v-else>
            <div v-if="quizzes.length === 0" class="alert alert-info text-center">
                Nenhum quiz disponível no momento. Seja o primeiro a enviar um!
            </div>

            <div v-else class="row g-4">
                <div v-for="quiz in quizzes" :key="quiz.id" class="col-6 col-md-4 col-lg-3">
                     <QuizCard :quiz="quiz" />
                </div>
            </div>

            <div v-if="hasMore" class="text-center mt-5">
                <BaseButton variant="outline-primary" :loading="isLoadingMore" loading-text="Carregando..."
                    @click="loadMore">
                    Carregar mais quizzes
                </BaseButton>
            </div>
        </template>
    </div>
</template>