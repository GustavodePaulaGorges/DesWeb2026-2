# Atividade Prática - Aula 03 — Login com JWT, Pinia e Proteção de Rotas (Trilhas API + Frontend)

## PARTE A — Backend: Login, JWT e Middleware de Autenticação

**Checklist das tarefas:**

- [x] jsonwebtoken instalado
- [x] .env atualizado com JWT_SECRET e JWT_EXPIRES_IN
- [x] config/jwt.js criado e programado com as funções de carregamento e segurança do
- [x] .env , geração e verificação de tokens
- [x] middlewares/auth.js criado e programado
- [x] userService.js atualizado com loginUser e getUserProfile
- [x] userValidator.js atualizado com loginValidator
- [x] userController.js atualizado com login , logout , getMyProfile
- [x] userRoutes.js atualizado, com /profile/me antes de /profile/:username

**Checklist dos testes:**

- [x] Login com sucesso devolve token e user (incluindo isAdmin )
- [x] Senha errada devolve 500 com mensagem genérica
- [x] GET /profile/me sem token devolve 401
- [x] GET /profile/me com token válido devolve os dados do usuário
- [x] GET /profile/me com token inválido devolve 401

## PARTE B — Frontend: Login, Pinia e Proteção de Rotas

**Checklist das tarefas:**

- [x] createPinia() registrado em main.js , antes de .use(router)
- [x] stores/auth.js criado, com persistência via localStorage
- [x] Interceptor de requisição anexando Authorization quando existe token
- [x] Interceptor de resposta limpando a sessão e redirecionando em qualquer 401
- [x] Os nomes de chave usados aqui batem exatamente com os usados na store (Etapa 2)
- [x] Bootstrap 5 (CSS) incluído via CDN
- [x] assets/main.css criado, com a cor de marca do seu projeto
- [x] Telas construídas de hoje em diante usam classes Bootstrap; as telas das Aulas 01–03 permanecem como estão, por ora
- [x] Tela de Login funcional, chamando authStore.login(...)
- [x] Destino padrão pós-login ajustado ao nome real da sua rota principal
- [x] Guarda de rota bloqueando acesso direto a rotas com requiresAuth: true
- [x] useAuthStore() chamado dentro do callback, não no topo do arquivo
- [x] Navbar mostra links diferentes conforme o estado de login
- [x] Logout limpa a sessão e redireciona ao Login

**Checklist de testes**

- [x] Login funcional → redireciona à tela principal do seu projeto.
- [x] F5 na página logado → sessão persiste (confira localStorage no DevTools).
- [x] Logout → depois disso, digitar a URL de uma rota protegida na barra de endereço deve redirecionar ao Login, com ?redirect=... na URL.
- [x] Login a partir dessa tela redirecionada → deve voltar exatamente para a rota original.
- [x] Com a sessão ativa, edite manualmente o token no localStorage (DevTools) para um valor qualquer, recarregue numa rota protegida → deve ser automaticamente redirecionado ao Login (prova do interceptor de 401 ).


