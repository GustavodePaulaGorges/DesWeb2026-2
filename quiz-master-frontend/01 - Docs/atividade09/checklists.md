# Atividade Prática - Aula 09 — CRUD do Item, Perfil Público e Limpeza de Arquivos Órfãos (Trilhas API + Frontend)

## PARTE A — Backend

**Checklist das tarefas:**

- [x] reload() adicionado ao seu detalhe
- [x] Duas chamadas seguidas ao detalhe devolvem contagens consecutivas
- [x] Verificação 404 antes de 403 , nas duas funções que verificam dono
- [x] Ordem banco → disco respeitada
- [x] Contador do usuário decrementado na exclusão
- [x] Quatro handlers no controller ( getMy<SuasEntidades> , get<SuaEntidade>ForEdit , update<SuaEntidade> e delete<SuaEntidade> )
- [x] Quatro rotas, com Multer antes do validador no PUT
- [x] include + order no nível de cima em getPublicProfile
- [x] isOwner devolvido no perfil público
- [x] /profile/:username com optionalAuth , depois de /profile/me
- [x] errorHandler.js atualizado para limpeza de arquivos órfãos e ainda sendo o último app.use do app.js

**Checklist dos testes:**

- [x] GET /my-<entidades> sem token → 401 ; com A → lista, mais novo primeiro; com B (sem itens) → [] .
- [x] GET /<rota>/:id/edit : sem token → 401 ; com B → 403 ; id inexistente → 404 ; com A →
- [x] 200 (e a contagem de visualizações não muda).
- [x] PUT só com texto, com A → 200 , arquivo inalterado, nenhuma mudança na contagem de arquivos.
- [x] PUT com arquivo novo, com A → 200 , nome do arquivo mudou, a contagem de arquivos da pasta continua igual (entrou um, saiu outro).
- [x] Órfãos: PUT com arquivo novo feito por B → 403 ; PUT com arquivo novo e título vazio feito por A → 400 . Nos dois casos, a contagem de arquivos não pode subir.
- [x] DELETE com B → 403 ; com A → 200 ; GET do item → 404 ; arquivos sumiram das pastas; contador do usuário caiu em 1; repetir o DELETE → 404 .
- [x] GET /profile/:username anônimo ( isOwner: false , lista de itens ordenada), com o token do dono ( isOwner: true ), com o token de B ( false ), e de um usuário inexistente ( 404 )

## PARTE B - Frontend

**Checklist das tarefas:**

- [x] useClickOutside.js criado
- [x] BaseModal.vue criado
- [x] Funções getMy<SuasEntidades>() , get<SuaEntidade>ForEdit(id) , update<SuaEntidade>(id,
- [x] formData) e delete<SuaEntidade>(id) criadas
- [x] getPublicProfile criada
- [x] Card sem <a> gigante, com autor clicável/opcional e slot actions
- [x] O Feed da Atividade 08 continua funcionando sem alteração

**Checklist dos testes:**

- [x] Menu do avatar: abre, fecha fora, fecha com Esc, fecha ao escolher um item.
- [x] "Ver Perfil" → seu perfil, com Editar Perfil (não "Seguir") e seus itens. Clique no autor de um card de outra conta → perfil dela, com "Seguir" (que ainda não faz nada). Dentro dele, clique no autor de outro card: a tela troca sem recarregar.
- [x] Janela anônima em /profile/<username> → sem "Seguir" e sem "Editar Perfil". Username inexistente → mensagem de erro, tela intacta.
- [x] Meus Itens: com uma conta sem itens → estado vazio com link; com itens → grade com
- [x] Editar/Excluir. Clique em Excluir → o modal abre sem navegar para o detalhe, centralizado mesmo com o mouse sobre o card; Cancelar/X/clicar fora/Esc fecham; clicar dentro da caixa branca não fecha.
- [x] Confirme uma exclusão → o item some sem recarregar; os arquivos sumiram da pasta de uploads da API; o contador do perfil caiu.
- [x] Edição: formulário pré-preenchido; salve só o texto → arquivo mantido; troque o arquivo → prévia imediata, e o antigo some da pasta; apague o título → mensagem do cliente, sem requisição nova na aba Network.
- [x] DevTools → Network: o PUT com arquivo tem Content-Type: multipart/form-data; boundary=... .
- [x] Logado como B, digite na URL a edição de um item da A → mensagem de permissão, sem a tela quebrar. Id inexistente → mensagem de não encontrado.
- [x] Deslogado, abra a URL de Meus Itens → vai ao login e volta para ela depois de entrar.
- [x] Detalhe de um item seu → "Editar" visível; de outra pessoa → ausente.
- [x] Regressão: Feed, Detalhe com player/imagem, Upload, Meu Perfil, Login/Logout.
