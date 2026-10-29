import api from './api'


export function getComments(quizId) {
    return api.get(`/quizzes/${quizId}/comments`)
}


export function addComment(quizId, content) {
    return api.post(`/quizzes/${quizId}/comments`, { content })
}