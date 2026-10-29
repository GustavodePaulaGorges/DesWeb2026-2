| Funcionalidade típica                       | Tela equivalente                                             | Vale para o seu projeto?                                                  |
| ------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Landing / página inicial                    | `LandingView.vue`                                            | Sempre                                                                    |
| Cadastro e autenticação                     | `auth/LoginView.vue`, `auth/RegisterView.vue`                | Sempre                                                                    |
| Exploração de quizzes por temas             | `theme/ThemeListView.vue`                                    | Sim                                                                       |
| Feed "Geral" e Feed "Seguindo"              | `feed/FeedView.vue`                                          | Sim (tabs/query param `?tab=seguindo` dentro da mesma tela)               |
| Upload/criação do conteúdo principal        | `quiz/QuizCreateView.vue`                                    | Sim (inclui upload de imagem/áudio das perguntas)                         |
| Detalhe de um item do conteúdo principal    | `quiz/QuizDetailView.vue`                                    | Sempre (inclui avaliação, comentários, curtir, favoritar, seguir criador) |
| Edição de um item do conteúdo principal     | `quiz/QuizEditView.vue`                                      | Sim                                                                       |
| Jogar quizzes e visualizar pontuação        | `quiz/PlayQuizView.vue`                                      | Sim                                                                       |
| "Meus itens"                                | `quiz/MyQuizzesView.vue`                                     | Sim                                                                       |
| Perfil próprio / perfil público             | `profile/MyProfileView.vue`, `profile/PublicProfileView.vue` | Sempre (mostra quizzes favoritados, seguidores/seguindo)                  |
| Dashboard administrativo                    | `admin/AdminDashboardView.vue`                               | Sempre                                                                    |
| Gerenciamento do conteúdo principal (admin) | `admin/AdminQuizzesView.vue`                                 | Sempre (inclui gerenciamento de temas via aba/painel)                     |
| Gerenciamento de usuários (admin)           | `admin/AdminUsersView.vue`                                   | Sempre                                                                    |
| Rota não encontrada                         | `NotFoundView.vue`                                           | Sempre                                                                    |