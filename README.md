# Auth Service

## Instalação

Obrigatório [Node.js](https://nodejs.org/) para rodar o projeto.

A configuração inicial consiste em copiar o arquivo .env.example para o arquivo .env

Instale as dependências e inicie o servidor.

```sh
npm i OR yarn #instalando as dependências
npm run dev OR yarn dev #executando o projeto
```

## Executando com Docker
Para rodar com o Docker acesse o terminal na raiz do projeto e execute comando:
```sh
docker-compose up
```

## Ambiente de produção
Para ambientes de produção, será necessário realizar o build antes de rodar o projeto.

```sh
npm i OR yarn #instalando as dependências
npm run build OR yarn build #realizando o build
npm run start OR yarn start #executando o projeto
```

## Testes

Para rodar os testes execute:

```sh
yarn test OR npm run test
```