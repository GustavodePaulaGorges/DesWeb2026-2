# Atividade Prática - Aula 05 — Upload de Arquivos e Edição de Perfil (Trilhas API + Frontend)

## PARTE A — Backend: Upload de Arquivos com Multer

**Checklist das tarefas:**

- [x] Pasta public/uploads/profiles/ criada, com um default-profile.png dentro
- [x] multer instalado
- [x] BIO_MAX: xxx adicionado a config/constants.js
- [x] middlewares/profileMulter.js criado
- [x] require('path') e a linha de express.static adicionados, antes das rotas da API
- [x] profileUpdateValidator , updateUserProfile , updateProfile e a rota PUT /profile/me criados, na ordem correta


**Checklist dos testes:**

- [x] Atualização sem foto funciona, mantendo a foto atual
- [x] Atualização com foto nova funciona, e a foto antiga (se não era a padrão) é removida do disco
- [x] GET /uploads/profiles/<qualquer-arquivo> responde 200
- [x] Bio acima de xxx caracteres é recusada com 400


## PARTE B — Frontend: Formulário Multipart e a Tela de Meu Perfil

**Checklist das tarefas:**

- [x] Link para a tela de perfil visível na Navbar, só quando logado
- [x] .env atualizado, utils/media.js criado
- [x] updateProfile(formData) adicionada — a única chamada de toda a aplicação a sobrescrever o Content-Type padrão

**Checklist de testes**

- [x] Tela carrega os dados reais do usuário ao montar
- [x] Selecionar uma foto atualiza a prévia instantaneamente, sem chamada de rede
- [x] Salvar funciona, com e sem trocar de foto


