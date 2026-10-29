# Atividade Prática - Aula 10 - Curtidas e Comentários na Entidade Principal (Trilhas API + Frontend)

## PARTE A — Backend

**Checklist das tarefas:**

- [x] COMMENT_MAX e as duas colunas de contador adicionadas
- [x] Models Like e Comment criados, com o índice único composto no Like
- [x] Associações nos dois sentidos
- [x] Tabelas e colunas conferidas no banco
- [x] Módulo like completo (3 rotas) e registrado no app.js
- [x] Módulo comment completo (2 rotas, validador com trim primeiro) e registrado
- [x] Todas as escritas duplas (linha + contador) dentro de transação
- [x] Detalhe devolvendo isLiked (e os contadores)
- [x] Exclusão em transação, com limpeza de curtidas e comentários
- [x] Contadores no perfil público
- [x] trim() movido para o início nos campos obrigatórios

**Checklist dos testes:**

- [x] Curtir sem token → 401 ; entidade inexistente → 404 .
- [x] B curte → 201 , liked: true , contador 1 ; B curte de novo → 200 , liked: false , 0 ; de novo → 201 , 1 ; A curte → 2 .
- [x] like-status (com e sem token) e isLiked no detalhe: visitante false ; B true .
- [x] No banco, tente inserir uma curtida repetida à mão → o banco recusa (índice único).
- [x] liked-<entidades> com B → os itens, cada um com o autor; sem token → 401 .
- [x] Comentar: sem token 401 ; só espaços 400 ; 501 caracteres 400 ; entidade inexistente 404 ; sucesso 201 com o texto aparado e o autor.
- [x] Listar comentários sem token → 200 , mais novos primeiro; contador no detalhe igual ao número de itens.
- [x] Excluir uma entidade que tem curtidas e comentários → 200 ; no banco, nenhuma linha restante em likes / comments para ela; arquivos removidos; contador do usuário decrementado.
- [x] Título/nome só com espaços (use o script do Bloco 10.9, porque o curl -F apara os espaços) → 400 depois da correção.
- [x] Regressão: upload, detalhe, feed, edição e perfil como antes.

## PARTE B - Frontend

**Checklist das tarefas:**

- [x] Dois services (do like e do comment) criados
- [x] Formatador ( utils/format.js ) criado
- [x] CSS criado
- [x] LikeButton com atualização otimista, rollback e isBusy
- [x] Visitante é levado ao login e volta
- [x] Lista com carregando/erro/vazio; formulário validado
- [x] Comentário novo no topo, sem recarregar a lista
- [x] Texto escapado e quebras de linha preservadas
- [x] Detalhe com curtir + comentários
- [x] Contadores no card
- [x] Tela de itens curtidos com rota e acessível por um clique

**Checklist dos testes:**

- [x] Visitante (janela anônima): vê o botão e a lista, sem formulário; clicar em curtir leva ao login e volta ao detalhe depois de entrar.
- [x] Logado: curtir muda o coração na hora; F5 mantém; descurtir desfaz.
- [x] DevTools → Network → Slow 4G: o coração ainda muda imediatamente. Depois, Offline: o coração muda, volta atrás e a mensagem de erro aparece.
- [x] Comentar: vazio, só espaços e mais de 500 caracteres geram erro sem chamar a API; um comentário válido de duas linhas aparece no topo, com as linhas preservadas, e o contador sobe.
- [x] Comente exatamente <b>teste</b> <img src=x onerror="alert(1)"> → aparece como texto, sem negrito e sem alerta.
- [x] Os contadores aparecem no card do Feed, do Perfil e de Meus Itens, atualizados.
- [x] Pelo menu/Sidebar, abra a tela de itens curtidos: descurtir um item no detalhe o tira da lista.
- [x] Como A, exclua um item que tem curtidas e comentários → funciona, e o item some da lista de curtidos de B.
- [x] Regressão: Feed, Perfil, Meus Itens (editar/excluir), Upload, Login/Logout.
