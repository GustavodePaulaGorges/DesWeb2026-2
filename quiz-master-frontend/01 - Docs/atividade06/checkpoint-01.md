Alguma rota ( *Routes.js ) contém lógica de negócio, em vez de só declarar verbo + caminho + middlewares + controller ?

Não. As rotas ficam declaradas apenas com verbo, caminho, middlewares e controller. A lógica de negócio está no Service e no Controller, não na rota. Exemplo: [quiz-master-api/modules/user/userRoutes.js](quiz-master-api/modules/user/userRoutes.js).

Algum Controller consulta o Model diretamente, sem passar pelo Service?

Não. Os controllers chamam o service, e o service consulta o model. Exemplo: [quiz-master-api/modules/user/userController.js](quiz-master-api/modules/user/userController.js) e [quiz-master-api/modules/user/userService.js](quiz-master-api/modules/user/userService.js).

Algum Service faz referência a req / res ?

Não. O service trabalha com parâmetros e retorna dados, sem acessar `req` ou `res`. Ele só lida com regras de negócio e acesso ao model.

Todo Controller usa success() / error() de apiResponse.js ?

Na maioria dos casos, sim: os controllers usam `success()` para responder com sucesso, como em [quiz-master-api/modules/user/userController.js](quiz-master-api/modules/user/userController.js) e [quiz-master-api/modules/search/searchController.js](quiz-master-api/modules/search/searchController.js). Os erros são centralizados em [quiz-master-api/middlewares/errorHandler.js](quiz-master-api/middlewares/errorHandler.js), que chama `error()` de [quiz-master-api/middlewares/apiResponse.js](quiz-master-api/middlewares/apiResponse.js).

Toda rota que chama uma função async está envolvida em asyncHandler ?

Sim. As rotas assíncronas estão envolvidas em `asyncHandler`, como em [quiz-master-api/modules/user/userRoutes.js](quiz-master-api/modules/user/userRoutes.js). O middleware está em [quiz-master-api/middlewares/asyncHandler.js](quiz-master-api/middlewares/asyncHandler.js).

Toda validação de entrada usa express-validator , sem nenhum if manual escondido?

Na validação de entrada da API, sim. A validação está centralizada em [quiz-master-api/modules/user/userValidator.js](quiz-master-api/modules/user/userValidator.js), usando `express-validator`. Há verificações de regra de negócio no service, mas isso não é validação manual de entrada na rota/controller.

config/constants.js não tem nenhuma constante solta sem uso, nem nenhum valor de validação fora dela?

Quase. As constantes de validação estão centralizadas em [quiz-master-api/config/constants.js](quiz-master-api/config/constants.js), e a maioria é usada em [quiz-master-api/modules/user/userValidator.js](quiz-master-api/modules/user/userValidator.js). Porém, `DESCRIPTION_MAX` está definida e não está sendo usada no código atual.

A constante de limite da bio (Aula 05) é usada exatamente uma vez, no lugar certo?

Sim. `VALIDATION.BIO_MAX` é usada na validação do campo `bio` em [quiz-master-api/modules/user/userValidator.js](quiz-master-api/modules/user/userValidator.js), e isso está no lugar correto.