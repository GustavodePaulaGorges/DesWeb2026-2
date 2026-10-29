# Atividade Prática - Aula 03 — Persistência de Dados e Primeiro Cadastro Real (Trilhas API + Frontend)

## 1. Objetivo

## 2. Antes de começar

## PARTE A — Backend: persistência de dados e primeiro cadastro real

### 3. Contextualização rápida

### 4. Etapa 1 — Instalando as dependências de hoje
Checklist desta etapa:
- [x] sequelize , mysql2 , bcryptjs , express-validator instalados

### 5. Etapa 2 — Preparando o Banco de Dados MySQL
Checklist desta etapa:
- [x] Banco de dados criado no MySQL, com o nome anotado na sua ficha
- [x] .env atualizado com DB_HOST , DB_PORT , DB_NAME , DB_USER , DB_PASSWORD
- [x] config/database.js criado

### 6. Etapa 3 — config/constants.js
Checklist desta etapa:
- [x] config/constants.js criado

### 7. Etapa 4 — O Módulo user
Checklist desta etapa (Model, Validator, Service):
- [x] userModel.js criado, com o campo de contagem renomeado corretamente
- [x] userValidator.js criado
- [x] userService.js criado, com getPublicProfile também usando o campo de contagem renomeado
- [x] Nunca a senha (nem o hash) é devolvida em nenhuma resposta

Checklist desta etapa:
- [x] middlewares/asyncHandler.js criado
- [x] middlewares/errorHandler.js criado

Checklist desta etapa:
- [x] userController.js e userRoutes.js criados, ambos idênticos ao modelo (nenhuma adaptação necessária aqui) 

### 8. Etapa 5 — Registrando o Módulo e o errorHandler em app.js
Checklist desta etapa:
- [x] userRoutes e errorHandler importados e registrados em app.js , na ordem certa
- [x] Terminal exibe Banco de dados sincronizado! ao subir a API
- [x] No MySQL, a tabela users do seu banco existe, com todas as colunas do Model

### 9. Etapa 6 — Testando
Checklist desta etapa:
- [x] Cadastro com sucesso responde 201 com { id, username, email }
- [x] Senha curta responde 400 com a mensagem correta
- [x] Cadastro duplicado responde 500 (não é bug, é esperado)
- [x] GET /profile/:username confirma os dados persistidos


## PARTE B — Frontend: telas do seu projeto e integração com a sua API

### 10. Contextualização rápida

### 11. Etapa 1 — Conhecendo o Contrato da Sua API

### 12. Etapa 2 — Conferindo a Navbar
Checklist desta etapa:
- [x] Existe um link clicável para /register em algum lugar acessível a um visitante deslogado

### 13. Etapa 3 — Construindo o Formulário Controlado
Checklist desta etapa:
- [x] Formulário controlado com v-model amarrando cada campo a form
- [x] errors e apiErrorMessage já preparados no <script setup> , mesmo antes de escrever validate() / handleSubmit()

### 14. Etapa 4 — Validação Client-Side
Checklist desta etapa:
- [x] validate() replica exatamente os mesmos limites configurados no userValidator.js do seu back-end
- [x] Mensagens de erro aparecem/desaparecem corretamente conforme o usuário corrige os campos

### 15. Etapa 5 — Integrando com a API
Checklist desta etapa:
- [x] Envio vazio não dispara nenhuma chamada de rede (confira na aba Network)
- [x] Cadastro válido navega para /login
- [x] Cadastro duplicado exibe apiErrorMessage com a mensagem vinda de verdade da API

### 16. Etapa 6 — Teste Prático e Confirmação Fora do Navegador
Checklist desta etapa:
- [x] Os cinco comportamentos acima foram testados e conferem
- [x] curl confirma que o cadastro feito pela tela está persistido no banco

## 17. Entrega
