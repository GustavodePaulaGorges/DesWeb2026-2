<script setup>
import { ref, onMounted } from 'vue'
import { getMyQuizzes, deleteQuiz } from '../../services/quizService'
import { useAuth } from '../../composables/useAuth'
import QuizCard from '../../components/quiz/QuizCard.vue'
import BaseModal from '../../components/base/BaseModal.vue'

const { currentUser } = useAuth()

const quizzes = ref([])
const isLoading = ref(true)
const apiErrorMessage = ref('')

const quizToDelete = ref(null)
const isDeleting = ref(false)
const deleteErrorMessage = ref('')

onMounted(async () => {
    try {
        const response = await getMyQuizzes()
        quizzes.value = response.data
    } catch (error) {
        apiErrorMessage.value = error.message
    } finally {
        isLoading.value = false
    }
})

function askDelete(quiz) {
    deleteErrorMessage.value = ''
    quizToDelete.value = quiz
}

function cancelDelete() {
    quizToDelete.value = null
}

async function confirmDelete() {
    isDeleting.value = true
    deleteErrorMessage.value = ''

    try {
        await deleteQuiz(quizToDelete.value.id)
        quizzes.value = quizzes.value.filter((quiz) => quiz.id !== quizToDelete.value.id)
        quizToDelete.value = null
    } catch (error) {
        deleteErrorMessage.value = error.message
    } finally {
        isDeleting.value = false
    }
}
</script>

<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="fw-bold mb-0">Meus Quizzes</h4>
            <router-link :to="{ name: 'quiz-create' }" class="btn btn-primary rounded-pill px-4">
                <i class="bi bi-plus-lg"></i> Novo quiz
            </router-link>
        </div>

        <p v-if="isLoading" class="text-center text-muted">Carregando...</p>
        <p v-else-if="apiErrorMessage" class="text-danger text-center">{{ apiErrorMessage }}</p>

        <template v-else>
            <div v-if="quizzes.length === 0" class="alert alert-info text-center">
                Você ainda não enviou nenhum quiz.
                <router-link :to="{ name: 'quiz-create' }">Envie o primeiro agora</router-link>.
            </div>

            <div v-else class="row g-4">
                <div v-for="quiz in quizzes" :key="quiz.id" class="col-6 col-md-4 col-lg-3">
                    <QuizCard :quiz="quiz" :author="currentUser">
                        <template #actions>
                            <div class="d-flex gap-2 mt-3">
                                <router-link :to="{ name: 'quiz-edit', params: { id: quiz.id } }"
                                    class="btn btn-sm btn-outline-secondary flex-fill">
                                    <i class="bi bi-pencil"></i> Editar
                                </router-link>
                                <button type="button" class="btn btn-sm btn-outline-danger flex-fill"
                                    @click="askDelete(quiz)">
                                    <i class="bi bi-trash"></i> Excluir
                                </button>
                            </div>
                        </template>
                    </QuizCard>
                </div>
            </div>
        </template>

        <BaseModal v-if="quizToDelete" title="Excluir quiz" :busy="isDeleting" @close="cancelDelete">
            <p class="mb-0">
                Tem certeza que deseja excluir <strong>{{ quizToDelete.title }}</strong>?
                Essa ação não pode ser desfeita.
            </p>
            <p v-if="deleteErrorMessage" class="text-danger small mt-3 mb-0">{{ deleteErrorMessage }}</p>

            <template #footer>
                <button type="button" class="btn btn-secondary" :disabled="isDeleting" @click="cancelDelete">
                    Cancelar
                </button>
                <button type="button" class="btn btn-danger" :disabled="isDeleting" @click="confirmDelete">
                    {{ isDeleting ? 'Excluindo...' : 'Excluir' }}
                </button>
            </template>
        </BaseModal>
    </div>
</template>