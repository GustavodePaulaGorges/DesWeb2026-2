1. **Por que a regra “uma pessoa só curte uma vez” deve estar no banco?**  
   A validação apenas no código não impede duas requisições simultâneas — ou outro caminho da aplicação — de gravarem a mesma curtida. O índice único composto `user_id` + `quiz_id` em `likeModel.js` faz o próprio banco garantir que exista no máximo uma curtida por pessoa e quiz, mesmo nesses casos.

2. **Contador guardado ou calculado: qual a diferença e qual é o risco?**  
   Um contador calculado conta as linhas de curtida sempre que é consultado; `Quiz.likesCount`, em `quizModel.js`, é guardado na tabela e pode ser lido sem refazer essa contagem. O contador guardado pode ficar diferente das curtidas reais se uma gravação for feita sem atualizar a outra. Em `likeService.js`, a criação/remoção da curtida e o incremento/decremento do contador usam a mesma transação: se uma etapa falhar, ambas são revertidas, desde que todas as consultas participem dela.

3. **O que acontece se uma operação esquecer `{ transaction: t }`?**  
   Essa operação fica fora da transação: pode ser confirmada independentemente e não será desfeita caso outra etapa provoque rollback. Por exemplo, no `commentService.js`, criar o comentário e incrementar `commentsCount` precisam receber `{ transaction: t }`; sem isso, pode haver comentário sem contador correspondente, ou contador alterado apesar de a transação falhar.

4. **O que é atualização otimista, quais são seus três passos e quando não usá-la?**  
   É atualizar a interface antes da resposta do servidor para que a ação pareça imediata. No `LikeButton.vue`, os três passos são: guardar o estado anterior e atualizar curtida/contador na hora; enviar a requisição; aplicar os valores confirmados pelo servidor ou restaurar o estado anterior se houver erro. Não é indicada quando o resultado não pode ser previsto com segurança, a rejeição é provável ou a ação é irreversível e não pode ser desfeita corretamente na interface.

5. **Por que exibir o comentário com `{{ }}` e nunca com `v-html`?**  
   Em `CommentSection.vue`, `{{ comment.content }}` exibe o conteúdo como texto e o Vue escapa as tags HTML. `v-html` as interpretaria como marcação, permitindo que conteúdo fornecido por uma pessoa fosse executado como HTML potencialmente malicioso (XSS).

6. **Por que `.trim()` precisa vir antes de `.notEmpty()`?**  
   `.trim()` remove espaços no início e no fim; depois disso, `.notEmpty()` rejeita o texto que ficou vazio. A ordem usada em `commentValidator.js` impede que uma string contendo apenas espaços seja aceita como comentário.