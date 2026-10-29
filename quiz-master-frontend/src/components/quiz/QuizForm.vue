<script setup>
import { ref } from 'vue'

defineProps({
    quiz: { type: Object, required: true },
})

const hasAnswered = ref(false)

function clickAnswer(answer) {
    hasAnswered.value = true
}
</script>

<template>
    <div>
        <h6 class="mb-3">{{ quiz.question }}</h6>

        <div v-for="answer in quiz.answers" :key="answer.id">
            <button
                type="button"
                class="btn w-100 text-start mb-2"
                :class="{
                    'btn-outline-secondary': !hasAnswered,
                    'btn-success': hasAnswered && answer.isCorrect,
                    'btn-danger': hasAnswered && !answer.isCorrect,
                }"
                :disabled="hasAnswered"
                @click="clickAnswer(answer)"
            >
                {{ answer.answer }}
            </button>
        </div>
    </div>
</template>