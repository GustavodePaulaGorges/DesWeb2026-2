# Atividade Prática - Aula 07 — Upload da Entidade Principal com Indicador de Progresso (Trilhas API + Frontend)

## PARTE A — Backend: Model, Associação e Upload

**Checklist das tarefas:**

- [x] Pasta(s) de upload da sua entidade criada(s)
- [x] TITLE_MAX adicionado a VALIDATION
- [x] Model criado, com o(s) campo(s) de arquivo certo(s) para o seu grupo (A ou B)
- [x] config/associations.js criado
- [x] Middleware de upload da sua entidade criado, coerente com seu Grupo
- [x] validator , service , controller e routes da sua entidade criados
- [x] Ordem de middlewares na rota conferida (auth → multer → validator → controller)
- [x] Rota montada em app.js
- [x] config/associations carregado antes do sync
- [x] Tabela nova confirmada no banco, com FK


**Checklist desta etapa:**

- [x] Upload completo funciona e a coluna de contagem do usuário sobe
- [x] Cada um dos quatro casos de erro é recusado com o status esperado



## PARTE B — Frontend: Componentização e Consistência Visual

**Checklist das tarefas:**

- [x] Service criado, recebendo onUploadProgress como parâmetro
- [x] .progress-bar (e, se aplicável, .thumbnail-preview ) adicionadas ao seu CSS
- [x] Formulário completo, adaptado ao seu domínio e ao seu Grupo (A ou B)
- [x] Barra de progresso funcionando
- [x] Prévia de imagem funcionando (onde aplicável)
- [x] Link/botão adicionado, visível só para usuários autenticados
- [x] Resposta ao checklist de alcançabilidade escrita, junto com a entrega

**Checklist desta etapa:**

- [x] Faça login → clique no link novo do Bloco 16 → confirme a URL mudando sem recarregar a página.
- [x] Tente enviar vazio → confirme os erros de campo obrigatório.
- [x] Se Grupo A: escolha só um dos dois arquivos → confirme o erro pedindo o outro.
- [x] Escolha o(s) arquivo(s) corretamente → confirme a prévia de imagem (onde aplicável), sem
- [x] nenhuma chamada de rede.
- [x] Envie → observe a barra de progresso avançar → confirme a mensagem de sucesso.
- [x] Nas DevTools → Network, confirme Content-Type: multipart/form-data; boundary=... na requisição.
- [x] Confirme, no banco ou via Postman, que o registro foi criado e a coluna de contagem do usuário subiu.

