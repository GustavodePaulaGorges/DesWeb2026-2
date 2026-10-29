<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getQuizById } from '../../services/quizService'
import { getImageUrl, getProfilePictureUrl } from '../../utils/media'
import QuizForm from '../../components/quiz/QuizForm.vue'
import LikeButton from '../../components/quiz/LikeButton.vue'
import CommentSection from '../../components/quiz/CommentSection.vue'

const route = useRoute()

const quiz = ref(null)
const isLoading = ref(true)
const apiErrorMessage = ref('')

async function loadQuiz() {
    isLoading.value = true
    apiErrorMessage.value = ''
    quiz.value = null

    try {
        const response = await getQuizById(route.params.id)
        quiz.value = response.data
    } catch (error) {
        apiErrorMessage.value = error.message
    } finally {
        isLoading.value = false
    }

}

onMounted(loadQuiz)

</script>

<template>
    <div class="container mt-4">
        <p v-if="isLoading" class="text-center text-muted">Carregando...</p>
        <p v-else-if="apiErrorMessage" class="text-danger text-center">{{ apiErrorMessage }}</p>

        <div v-else-if="quiz" class="row">
            <div class="col-12 col-lg-4 d-flex justify-content-center">
                <div class="image-placeholder mb-4">
                    <img :src="getImageUrl(quiz.imagePath)" :alt="quiz.title"
                        class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover" />
                </div>
            </div>

            <div class="col-12 col-lg-8">
                <h1 class="h4 fw-bold mb-2">{{ quiz.title }}</h1>

                <div class="d-flex align-items-center mb-3">
                    <router-link :to="{ name: 'public-profile', params: { username: quiz.User.username } }"
                        class="d-flex align-items-center text-decoration-none text-dark">
                        <img :src="getProfilePictureUrl(quiz.User.profilePicture)" :alt="quiz.User.username"
                            class="rounded-circle me-2" width="40" height="40" style="object-fit: cover;" />
                        <div>
                            <h6 class="mb-0">{{ quiz.User.fullName }}</h6>
                            <small class="text-muted">@{{ quiz.User.username }}</small>
                        </div>
                    </router-link>
                    <span class="ms-auto text-muted small">{{ quiz.views }} visualizações</span>
                </div>

                <div v-if="quiz.isOwner" class="mb-3 d-flex gap-1">
                    <LikeButton :quiz-id="quiz.id" :initial-liked="quiz.isLiked"
                        :initial-count="quiz.likesCount" />

                    <router-link :to="{ name: 'quiz-edit', params: { id: quiz.id } }"
                        class="btn btn-outline-secondary rounded-pill">
                        <i class="bi bi-pencil"></i> Editar
                    </router-link>
                </div>

                <QuizForm :quiz="quiz" />

                <CommentSection :quiz-id="quiz.id" />
            </div>
        </div>
    </div>
</template>