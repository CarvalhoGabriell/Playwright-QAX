
# Playwright + WEB e API

    Adicione etiquetas de algum lugar, como: [shields.io](https://shields.io/)


    Projeto de automação WEB, construído do zero durante as aulas do curso: Playwright Express ministrado por Fernando Papito/ QAExperience.

    Durante as aulas implementamos as melhores práticas de automação web com o framework Playwright + TypeScript. Validações de regra de negócio, validação na camada de API da aplicação WEB.

## O que esssa automação faz?
    text aqui embaixo

## Tecnologias Uttilizadas
- TypeScript
- Playwright
- Node.js



## Aplicação WEB 
    - Testamos o Mark L, uma aplicação de controle de tarefas onde é posivel realizar todo um CRUD de tarefas, usando tanto o Frontend da aplicação como também as APIs disponíveis.

    // imagem do front

## Como executar os testes?
 Para a execução dos scripts precisamos primeiro colocar o ambiente de HML/DEV no ar, subindo a aplicação WEB e o server da API.

Comece rodando o seguinte comando duas vezes:
- 1- Escolhendo a opção WEB para subir a aplicação WEB/Front
- 2- Escolhendo a opção API para subir o server da API
```bash
  npm run start
```

##
Ambiente no ar, agora é so executar o comando para executar todos os arquivos de testes:
```bash
  npx playwright test
```

Outra forma de executar os testes. Agora passando o arquivo específico para rodar:
```bash
  npx playwright test tasks.spec.ts
```

Para uma execução mais detalhada a tag `--debug` ajuda a debuggar o seu código
```bash
  npx playwright test tasks.spec.ts --debug
```

Após a finalização dos testes, acesse o report gerado pelo playwright executando:

```bash
  npx playwright show-report
```



## Autores

- [@CarvalhoGabriell](https://github.com/CarvalhoGabriell)