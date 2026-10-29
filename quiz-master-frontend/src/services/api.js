import axios from "axios";

/**
 * Api.js: Resolve as chamadas à API, junto com o tratamento dos erros.
 * 
 * 'Caminho feliz (sucesso)': retorna os dados da response contidos dentro de response.data
 * 'Erros': (Promise.reject {message, errors, status })
 *   - 'Resposta com erro': Quando a API devolve uma resposta, porém com erro, por exemplo, erro interno 500 (quando durante a execução ocorre algum erro no código). Retorna os dados do erro fornecidos pela api junto do seu código.
 *   - 'Sem resposta': Quando a requisição é enviada com sucesso, porém a API não devolve uma resposta (servidor off, problemas de conexão etc.). Devolve uma mensagem informando que não foi possível conectar, sem dados de erro.
 *   - 'Erro de requisição' Quando a requisição sequer é enviada, e ocorre um erro anterior (erro de parsing, falha de compilação, entre outros). Devolve uma mensagem informando que ocorreu um erro ao enviar a requisição, sem dados de erro.
 */

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('quiz_token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            // reposta da api com status de erro
            const apiError = error.response.data

            if (error.response.status === 401) {
                localStorage.removeItem('quiz_token')
                localStorage.removeItem('quiz_user')

                if (window.location.pathname !== '/login') {
                    window.location.href = '/login'
                }
            }

            return Promise.reject({
                message: apiError.message || 'Ocorreu um erro na requisição',
                errors: apiError.errors || [],
                status: error.response.status
            })
        } else if (error.request) {
            // requisição enviada mas não deu resposta
            return Promise.reject({
                message: 'Não foi possível se conectar ao servidor. Verifique sua conexão ou tente novamente',
                errors: [],
                status: null
            })
        } else {
            // erro ao montar a requisição 
            return Promise.reject({
                message: 'Erro inesperado ao preparar a requisição.',
                errors: [],
                status: null
            })
        }
    }
)

export default api;