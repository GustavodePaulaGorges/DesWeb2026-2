<script setup>
import { computed } from 'vue'
import { getImageUrl, getProfilePictureUrl } from '../../utils/media'

const props = defineProps({
    quiz: { type: Object, required: true },
    author: { type: Object, default: null },
})

const displayAuthor = computed(() => props.author ?? props.quiz.User)
</script>

<template>
    <div class="quiz-card">
        <router-link :to="{ name: 'quiz-detail', params: { id: quiz.id } }" class="d-block">
            <div class="image-placeholder"
                :style="{ backgroundImage: `url(${getImageUrl(quiz.imagePath)})` }">
                <i class="bi bi-play-circle play-icon"></i>
                <span class="badge-views"><i class="bi bi-eye"></i> {{ quiz.views }}</span>
            </div>
        </router-link>

        <div class="p-3">
            <h6 class="text-truncate mb-1">
                <router-link :to="{ name: 'quiz-detail', params: { id: quiz.id } }"
                    class="text-decoration-none text-dark">
                    {{ quiz.title }}
                </router-link>
            </h6>

            <router-link v-if="displayAuthor"
                :to="{ name: 'public-profile', params: { username: displayAuthor.username } }"
                class="d-flex align-items-center text-decoration-none">
                <img :src="getProfilePictureUrl(displayAuthor.profilePicture)" :alt="displayAuthor.username"
                    class="rounded-circle me-2" width="24" height="24" style="object-fit: cover;" />
                <span class="text-muted small">@{{ displayAuthor.username }}</span>
            </router-link>

             <div v-if="quiz.likesCount !== undefined" class="d-flex gap-3 text-muted small mt-2">
                <span><i class="bi bi-heart"></i> {{ quiz.likesCount }}</span>
                <span><i class="bi bi-chat"></i> {{ quiz.commentsCount }}</span>
            </div>

            <slot name="actions" />
        </div>
    </div>
</template>
