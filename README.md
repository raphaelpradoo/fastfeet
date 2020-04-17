<h1 align="center">
  <img alt="FastFeet" height="215" title="FastFeet" src="logo.svg" />
</h1>

<p align="center">Este código representa a minha solução do desafio final FastFeet da Rocketseat.</p>

<p align="center">
 <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
 <a href="#computer-instalação-execução-e-desenvolvimento">Instalação, execução e desenvolvimento</a>
</p>

<strong>Links dos desafios:</strong>

- [Etapa 1](https://github.com/raphaelpradoo/fastfeet/blob/master/backend/ETAPA01.md)
- [Etapa 2](https://github.com/raphaelpradoo/fastfeet/blob/master/backend/ETAPA02.md)
- [Etapa 3](https://github.com/raphaelpradoo/fastfeet/blob/master/frontend/ETAPA03.md)
- [Etapa 4](https://github.com/raphaelpradoo/fastfeet/blob/master/mobile/ETAPA04.md)
            
## :rocket: Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [React Native](https://reactnative.dev/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL](https://www.postgresql.org/)
- [Express](https://github.com/expressjs/express)
- [Redis](https://redis.io/)
- [Bee-Queue](https://github.com/bee-queue/bee-queue)

## :computer: Instalação, execução e desenvolvimento

Faça um clone desse repositório.

### Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Backend

- A partir da raiz do projeto, entre na pasta rodando `cd backend/`;
- Rode `yarn` para instalar sua dependências;
- Rode `cp .env.example .env` e preencha o arquivo `.env` com SUAS variáveis ambiente;
- Rode `docker-compose up -d` para montar o ambiente;
- Rode `yarn sequelize db:migrate` para executar as migrations;
- Para executar somente a migration de `admin-user` rode o comando `yarn sequelize db:seed --seed 20200330181705-admin-user.js`
- Importe o arquivo `Insomnia.json` desse repositório no Insomnia;
- Rode `yarn dev` para iniciar o servidor 

### Web

_ps: Antes de executar, lembre-se de iniciar o backend deste projeto_

- A partir da raiz do projeto, entre na pasta do frontend web rodando `cd frontend/`;
- Rode `yarn` para instalar as dependências;
- Rode `yarn start` para iniciar o client web;

### Mobile

Obs.: Esse projeto mobile foi testado apenas no **iOS**.

_ps: Antes de executar, lembre-se de iniciar o backend deste projeto_

- A partir da raiz do projeto, entre na pasta do frontend mobile rodando `cd mobile/`;
- Rode `yarn` para instalar as dependências;
- Execute o comando `react-native run-ios` para o aplicativo abrir no emulador do Iphone;

---

Desenvolvido por [Raphael Souza Prado](https://www.linkedin.com/in/raphaelpradooliveira/)
