<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { uploadQuiz } from '../../services/quizService.js'
import BaseInput from '../../components/base/BaseInput.vue'
import BaseButton from '../../components/base/BaseButton.vue'
import FormCard from '../../components/base/FormCard.vue'

const TITLE_MAX = 100
const DESCRIPTION_MAX = 500
const QUESTION_MAX = 255
const ANSWER_MAX = 100
const ANSWER_QT_MAX = 5

const form = reactive({
  title: '',
  description: '',
  question: '',
  answers: [
    { awnser: '', isCorrect: false }
  ]
})

const errors = reactive({
  title: '',
  description: '',
  question: '',
  answers: [
    { message: '' }
  ]
})

watch(
  () => form.answers.map(answer => answer.awnser),
  () => {
    const lastIndex = form.answers.length - 1
    const lastAnswer = form.answers[lastIndex].awnser.trim()

    if (lastAnswer && form.answers.length < ANSWER_QT_MAX) {
      form.answers.push({ awnser: '', isCorrect: false })
      errors.answers.push({ message: '' })
    }

    while (
      form.answers.length > 1 &&
      !form.answers[form.answers.length - 1].awnser.trim() &&
      !form.answers[form.answers.length - 2].awnser.trim()
    ) {
      form.answers.pop()
      errors.answers.pop()
    }
  }
)

const imageInputRef = ref(null)

const selectedImage = ref(null)
const imagePreviewUrl = ref('')

const isSubmitting = ref(false)
const uploadProgress = ref(0)
const apiErrorMessage = ref('')
const successMessage = ref('')

const descriptionCharsRemaining = computed(() => DESCRIPTION_MAX - form.description.length)
const questionCharsRemaining = computed(() => QUESTION_MAX - form.question.length)

function handleImageChange(event) {
  const file = event.target.files[0]
  if (!file) {
    selectedImage.value = null
    imagePreviewUrl.value = ''
    return
  }

  selectedImage.value = file

  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreviewUrl.value = e.target.result
  }
  reader.readAsDataURL(file)
}

function validateField(value, { maxLength, requiredMessage = '', maxMessage }) {
  if (requiredMessage && !value.trim()) {
    return requiredMessage
  }

  if (value.length > maxLength) {
    return maxMessage
  }

  return ''
}

function validate() {
  errors.title = validateField(form.title, {
    maxLength: TITLE_MAX,
    requiredMessage: 'O título é obrigatório.',
    maxMessage: `O título deve ter no máximo ${TITLE_MAX} caracteres.`
  })
  errors.description = validateField(form.description, {
    maxLength: DESCRIPTION_MAX,
    maxMessage: `A descrição deve ter no máximo ${DESCRIPTION_MAX} caracteres.`
  })
  errors.question = validateField(form.question, {
    maxLength: QUESTION_MAX,
    requiredMessage: 'A pergunta é obrigatória.',
    maxMessage: `A pergunta deve ter no máximo ${QUESTION_MAX} caracteres.`
  })

  const hasFilledAnswer = form.answers.some(answer => answer.awnser.trim())
  for (let index = 0; index < form.answers.length; index += 1) {
    const answer = form.answers[index].awnser
    const isTrailingPlaceholder = index === form.answers.length - 1 && !answer.trim() && hasFilledAnswer

    errors.answers[index].message = isTrailingPlaceholder ? '' : validateField(answer, {
      maxLength: ANSWER_MAX,
      requiredMessage: `A resposta ${index + 1} é obrigatória.`,
      maxMessage: `A resposta ${index + 1} deve ter no máximo ${ANSWER_MAX} caracteres.`
    })
  }

  apiErrorMessage.value = selectedImage.value ? '' : 'Selecione uma imagem para o quiz.'

  return errors.title === '' &&
    errors.description === '' &&
    errors.question === '' &&
    errors.answers.every(error => error.message === '') &&
    apiErrorMessage.value === ''
}

function resetForm() {
  form.title = ''
  form.description = ''
  form.question = ''
  form.answers = [
    { awnser: '', isCorrect: false }
  ]
  selectedImage.value = null
  imagePreviewUrl.value = ''
  uploadProgress.value = 0
  if (imageInputRef.value) imageInputRef.value.value = ''
}

async function handleSubmit() {
  successMessage.value = ''

  if (!validate()) {
    return
  }

  isSubmitting.value = true
  uploadProgress.value = 0

  const formData = new FormData()
  formData.append('title', form.title.trim())
  formData.append('description', form.description.trim())
  formData.append('question', form.question.trim())
  formData.append('answers', JSON.stringify(form.answers
    .filter(answer => answer.awnser.trim())
    .map(answer => ({ answer: answer.awnser.trim(), isCorrect: answer.isCorrect }))))
  formData.append('image', selectedImage.value)

  try {
    await uploadQuiz(formData, (progressEvent) => {
      uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    })

    successMessage.value = 'Quiz enviado com sucesso!'
    resetForm()
  } catch (error) {
    apiErrorMessage.value = error.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <FormCard title="Enviar Novo Quiz">
    <form @submit.prevent="handleSubmit">
      <BaseInput label="Título do Quiz" v-model="form.title" placeholder="Um título cativante para seu quiz"
        :error="errors.title" :disabled="isSubmitting" />

      <BaseInput label="Descrição" type="textarea" v-model="form.description"
        placeholder="Conte mais sobre seu quiz (opcional)" :error="errors.description" :disabled="isSubmitting">
        <template #hint>
          <div class="form-text text-end" :class="{ 'text-danger': descriptionCharsRemaining < 0 }">
            {{ form.description.length }}/{{ DESCRIPTION_MAX }}
          </div>
        </template>
      </BaseInput>

      <BaseInput label="Pergunta" type="textarea" v-model="form.question" placeholder="Descreva a pergunta desse quiz"
        :error="errors.question" :disabled="isSubmitting">
        <template #hint>
          <div class="form-text text-end" :class="{ 'text-danger': questionCharsRemaining < 0 }">
            {{ form.question.length }}/{{ QUESTION_MAX }}
          </div>
        </template>
      </BaseInput>

      <div v-for="(answer, index) in form.answers" :key="index" class="answer-row d-flex align-items-center gap-3 mb-3">
        <BaseInput class="answer-input" :label="'Resposta Nº ' + (index + 1)" v-model="form.answers[index].awnser"
          placeholder="Uma resposta" :error="errors.answers[index].message" :disabled="isSubmitting" />
        <div class="answer-correct form-check d-flex align-items-center gap-2 mb-0 flex-shrink-0">
          <input :id="'answer-correct-' + index" class="answer-correct-input form-check-input m-0" type="checkbox"
            v-model="form.answers[index].isCorrect" :disabled="isSubmitting" />
          <label class="form-check-label" :for="'answer-correct-' + index">Correta?</label>
        </div>
      </div>

      <div class="mb-3">
        <label for="imageFile" class="form-label">Imagem do Quiz</label>
        <input id="imageFile" ref="imageInputRef" type="file" class="form-control" accept="image/*"
          :disabled="isSubmitting" @change="handleImageChange" />
        <div class="form-text">Uma imagem que represente seu quiz. Formatos: JPG, PNG.</div>

        <img v-if="imagePreviewUrl" :src="imagePreviewUrl" alt="Prévia da capa" class="quiz-image-preview mt-2" />
      </div>

      <div v-if="isSubmitting" class="progress mb-3" style="height: 10px;">
        <div class="progress-bar" role="progressbar" :style="{ width: uploadProgress + '%' }"
          :aria-valuenow="uploadProgress" aria-valuemin="0" aria-valuemax="100"></div>
      </div>

      <p v-if="apiErrorMessage" class="text-danger small">{{ apiErrorMessage }}</p>
      <p v-if="successMessage" class="text-success small">
        {{ successMessage }}
        <router-link :to="{ name: 'my-quizzes' }">Ver em Meus Quizzes</router-link>
      </p>

      <div class="d-grid gap-2">
        <BaseButton type="submit" :loading="isSubmitting" loading-text="Enviando...">
          Enviar Quiz
        </BaseButton>
        <router-link to="/feed" class="btn btn-outline-secondary btn-lg">Cancelar</router-link>
      </div>
    </form>
  </FormCard>
</template>

<style scoped>
.answer-row :deep(.answer-input) {
  flex: 1;
  min-width: 0;
  margin-bottom: 0 !important;
}

.answer-correct {
  --answer-control-height: calc(1.5em + 0.75rem + 2px);
  height: var(--answer-control-height);
  align-self: flex-end;
}

.answer-correct-input {
  width: var(--answer-control-height);
  height: var(--answer-control-height);
}
</style>