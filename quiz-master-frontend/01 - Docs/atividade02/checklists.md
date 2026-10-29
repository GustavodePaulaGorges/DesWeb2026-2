# Trilhas API (Módulo de Busca) + Frontend (Camada de Comunicação com a API) Aula 02

## 1. Objetivo

## 2. Antes de começar

## 2.1. Uma decisão a tomar antes de começar: o nome do seu campo de busca

## PARTE A — Backend: o primeiro módulo de domínio

### 3. Contextualização rápida

### 4. Etapa 1 — Criando o módulo search
Checklist desta etapa:
- [x] Pasta modules/search/ criada
= [x] searchService.js criado, com o nome da sua entidade no plural (não videos , a menos que essa seja mesmo a sua entidade)

### 5. Etapa 2 — Criando o controller
Checklist desta etapa:
- [x] searchController.js criado, usando exports.search = ... (não module.exports = ... )
- [x] O objeto retornado usa o nome da sua entidade no plural, igual ao definido no service

### 6. Etapa 3 — Criando a rota
Checklist desta etapa:
- [x] searchRoutes.js criado, com router.get('/search', searchController.search)

### 7. Etapa 4 — Registrando o módulo em app.js
Checklist desta etapa:
- [x] searchRoutes importado no topo de app.js
- [x] app.use('/api', searchRoutes) adicionado
- [x] API reiniciou sem erros

### 8. Etapa 5 — Testando isoladamente
Checklist desta etapa:
- [x] curl .../api/search?q=teste responde no formato esperado, com o nome certo do campo
- [x] curl .../api/search (sem q ) responde com query: ""
- [x] curl .../api continua respondendo normalmente

## PARTE B — Frontend: telas do seu projeto e integração com a sua API

### 9. Contextualização rápida

### 10. Etapa 1 — Instância única do Axios
Checklist desta etapa:
- [x] src/services/api.js criado com axios.create(...) usando VITE_API_URL

### 11. Etapa 2 — Interceptor de resposta (tratamento de erro centralizado)
Checklist desta etapa:
- [x] Interceptor de resposta adicionado a api.js
- [x] Comentário no topo do arquivo, com suas palavras, explicando os três ramos

### 12. Etapa 3 — Criando os primeiros services
Checklist desta etapa:
- [x] authService.js criado com register , login , logout (ainda sem uso)
- [x] searchService.js criado, usando params: { q: query }
- [x] systemService.js criado

### 13. Etapa 4 — Refatorando a Landing Page
Checklist desta etapa:
- [x] LandingView.vue usando getApiStatus() em vez de fetch
- [x] Página ainda mostra "Status da API: online

### 14. Etapa 5 — Validando a camada com a busca

#### 14.1. Teste temporário

#### 14.2. Provocando o erro de rede de propósito

#### 14.3. Removendo o teste temporário
Checklist desta etapa:
- [x] Console mostrou Busca OK: com o objeto esperado, usando o nome certo da sua entidade
- [x] Erro de rede provocado de propósito caiu na mensagem amigável do interceptor, não num
erro técnico
- [x] Bloco de teste removido da Landing Page ao final

## 17. Entrega
