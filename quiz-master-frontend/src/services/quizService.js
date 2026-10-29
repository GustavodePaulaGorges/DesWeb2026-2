import api from './api'

export function uploadQuiz(formData, onUploadProgress) {
    return api.post('/quizzes/upload', formData, {
        headers: { 'Content-Type': undefined },
        onUploadProgress,
    })
}

export function getQuizById(id) {
    return api.get(`/quizzes/${id}`)
}

export function getMyQuizzes() {
    return api.get('/my-quizzes')
}


export function getQuizForEdit(id) {
    return api.get(`/quizzes/${id}/edit`)
}


export function updateQuiz(id, formData) {
    return api.put(`/quizzes/${id}`, formData, {
        headers: { 'Content-Type': undefined },
    })
}


export function deleteQuiz(id) {
    return api.delete(`/quizzes/${id}`)
}