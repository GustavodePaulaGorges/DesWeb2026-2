# Atividade Prática - Aula 08 — Streaming, Detalhe da Entidade Principal e Feed Paginado (Trilhas API + Frontend)

## PARTE A — Backend: Detalhe, Feed e Streaming

**Checklist das tarefas:**

- [x] middlewares/optionalAuth.js criado
- [x] get<SuaEntidade>Details / getFeed<SuaEntidade> adicionados ao service
- [x] Controller e rota do detalhe criados, com optionalAuth
- [x] Coluna de visualizações confirmada (criada ou reaproveitada)
- [x] getFeed adicionado a userController.js / userRoutes.js

**Checklist dos testes**

- [x] Detalhe sem token → 200 , isOwner: false , contagem de visualizações em 1 .
- [x] Detalhe com o token do dono → 200 , isOwner: true , contagem em 2 .
- [x] Detalhe de um item inexistente → 404 .
- [x] Feed sem token → 401 .
- [x] Feed com token, ?page=1&limit=1 → um item só.
- [x] Feed com token, ?page=2&limit=1 → [] (se você só tem um item), ou o próximo item

## PARTE B — Frontend: Feed e Detalhe com Dados Reais

**Checklist das tarefas:**

- [x] Função(ões) de URL adicionadas a utils/media.js , coerentes com seu Grupo
- [x] Classes de card adicionadas, com a proporção certa para o seu tipo de conteúdo
- [x] Classe de player adicionada (para projetos que possuem streaming)
- [x] Funções get<SuaEntidade>ById e getFeed criadas no userService.js
- [x] Componente de card criado, adaptado ao seu domínio
- [x] Tela de Feed exibindo itens reais, com paginação "Carregar mais" funcionando
- [x] Tela de Detalhe exibindo o item real, com o player/imagem correto para o seu projeto
- [x] isOwner , recebido da API, guardado no estado da tela, mesmo sem uso visual ainda (chega na Aula 09)

**Checklist desta etapa:**
- [x] Faça login → clique no link do seu Feed na Navbar/Sidebar → confirme itens reais aparecendo.
- [x] Clique num card → confirme a navegação para o detalhe, sem recarregar a página.
- [x] Se se projeto não possui streaming: confirme que a imagem carrega em resolução real (maior que a miniatura do card).
- [x] Recarregue a tela de detalhe (F5) uma segunda vez → confirme, via curl em GET /api/<sua-rota>/:id , que a contagem de visualizações subiu.
- [x] Acesse um id inexistente diretamente pela URL → confirme a mensagem de erro, sem a tela quebrar
