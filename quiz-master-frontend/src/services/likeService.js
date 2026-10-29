import api from './api'


export function toggleLike(quizId) {
    return api.post(`/quizzes/${quizId}/toggle-like`)
}


export function getLikedQuizzes() {
    return api.get('/liked-quizzes')
}